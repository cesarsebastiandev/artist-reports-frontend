import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../shared/ui/material-module';
import { Artist } from '../../interfaces/artist';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-artist',
  imports: [MaterialModule],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
})
export class ArtistComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'lastname', 'instrument'];
  dataSource: MatTableDataSource<Artist>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  artistsArray: Artist[] = [];

  constructor(private artistService: ArtistService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.artistsArray);
  }
  ngOnInit(): void {
    this.getArtists();
  }

  getArtists() {
    this.artistService.getAllArtists().subscribe({
      next: (response: any) => {
        this.artistsArray = response;
        console.log('THIS IS THE DATA FROM BACKEND', this.artistsArray);
        this.dataSource.data = this.artistsArray;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  downloadPdf(): void {
    this.artistService.downloadReport().subscribe({
      next: (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'artists_report.pdf'; // file name
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error to download the PDF', err);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
