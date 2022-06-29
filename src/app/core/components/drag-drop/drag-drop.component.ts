import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';


@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})


export class DragDropComponent implements OnInit {
  files: NgxFileDropEntry[] = [];
  imageUrl = ""
  imageSize: string = ''
  multiple: Boolean = false;
  @Input() isMultiple: Boolean = false;
  imageDetail: any = {
    name: '',
    size: '',
    url: ''

  }
  imagesResponse: any[] = []
  images: any[] = []
  @Output() onSelection: EventEmitter<any[]> = new EventEmitter();
  @Output() onUpload: EventEmitter<any[]> = new EventEmitter();
  constructor() { }

  imageSizeCalculater(bytes, decimals) {

    if (bytes === 0 || bytes == undefined || bytes == null) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  dropped = async (files: NgxFileDropEntry[]) => {
    this.files = files;

    files.forEach(droppedFile => {
      this.imagesResponse = []
      this.images = []
      // Is it a file?
      let imageUrl
      if (droppedFile.fileEntry.isFile) {
        var fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
          imageUrl = await this.handleUpload(file)
          this.imageSize = this.imageSizeCalculater(file.size, 2)
          if (imageUrl != "" && imageUrl != undefined) {
            let imageDetail = {
              name: file.name,
              size: this.imageSize,
              url: imageUrl
            }
            this.imageDetail.name = file.name
            this.imageDetail.size = this.imageSize
            this.imagesResponse.push(file)
            this.images.push(imageDetail)
            this.imageUrl = ""
          }
          if (this.files.length == this.images.length)
            this.onSelection.emit(this.imagesResponse);
          console.log('images', this.images);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    })
  }
  readUploadedFile = (inputFile) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        console.log("Problem parsing input file.")
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
  };

  handleUpload = async (file) => {
    let fileContents = await this.readUploadedFile(file)
    return fileContents
  }

  remove(index) {
    this.images.splice(index, 1);
    this.onSelection.emit(this.images);

  }
  // upload() {
  //   this.onUpload.emit(this.imagesResponse);
  // }




  ngOnInit() {
  }

}
