import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'comment-form',
  templateUrl: './commentForm.component.html',
  styleUrls: ['./commentForm.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() submitLabel!: string;
  @Input() hasCancelButton: boolean = false;
  @Input() initialText: string = '';

  @Output()
  handleSubmit = new EventEmitter<string>();

  @Output()
  handleCancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.initialText, Validators.required],
    });
  }

  onSubmit(): void {
    if(this.form.value.title.trim()!=0){
    this.handleSubmit.emit(this.form.value.title);
    this.form.reset();
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Invalid input',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
