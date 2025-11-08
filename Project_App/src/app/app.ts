import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ImportsModule } from './import';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { MessageService, SelectItem } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { Course, CourseService } from '../service/product.service';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { PrimeIcons, MenuItem } from 'primeng/api';


interface AutoCompleteEvent {
    originalEvent: Event;
    query: string;  
}

interface Subject {
  name: string;
  code: string;
}
@Component({
  selector: 'app-root', 
  imports: [
    RouterOutlet, 
    ButtonModule,
    TagModule,
    TableModule,
    FloatLabelModule, 
    InputTextModule,
    FormsModule,
    ImportsModule, 
    MultiSelectModule,
    DatePickerModule,
    CommonModule
  ],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [MessageService,CourseService],
  
})
export class App implements OnInit {



  studentName: string = '';       
  studentId: string | null = null; 
  studentIds: string[] = [];   
  

    

    search(event: any) {
    let _items = [...Array(10).keys()];

    const query = event.query.toLowerCase();
    const allIds = ['21DH110029', '21DH110020', '21NN220219', '21QT301120', '21DL110045'];
    this.studentIds = allIds.filter(id => id.toLowerCase().includes(query));
    }

    date: Date | undefined;

    ingredient!: string;


    subjects: Subject[] = [
      { name: 'Lập trình C++', code: 'CS102' },
      { name: 'Cơ sở dữ liệu', code: 'DB203' },
      { name: 'Công nghệ phần mềm', code: 'EC201' },
      { name: 'Tiếng Anh chuyên ngành', code: 'ENG205' },
      { name: 'Cấu trúc dữ liệu và giải thuật', code: 'Cl102' },
      { name: 'Lý thuyết đồ thị', code: 'LT222' },
      { name: 'Pháp luật đại cương', code: 'PL303' },
      { name: 'Tiếng Anh cơ bản 3', code: 'ENB25' }
    ];

    selectedSubjects: Subject[] = [];
    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }


    courses: Course[] = [];
  statuses!: SelectItem[];
  clonedCourses: { [s: string]: Course } = {};

  constructor(private courseService: CourseService, private messageService: MessageService) {}

  ngOnInit() {
    this.courseService.getCourses().then((data) => (this.courses = data));

    this.statuses = [
      { label: 'Đã duyệt', value: 'APPROVED' },
      { label: 'Chờ duyệt', value: 'PENDING' },
      { label: 'Từ chối', value: 'REJECTED' },
    ];
    
  }

   exportCSV() {
  if (!this.courses || this.courses.length === 0) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Cảnh báo',
      detail: 'Không có dữ liệu để xuất!',
      life: 3000
    });
    return;
  }

  const headers = ['Mã Môn Học', 'Tên Môn Học', 'Số Tín Chỉ', 'Trạng Thái'];

  
  const rows = this.courses.map(c => [
    c.courseCode,
    c.courseName,
    c.credit,
    c.status
  ]);

  
  const csvContent =
    headers.join(',') +
    '\n' +
    rows.map(e => e.join(',')).join('\n');

  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'danh-sach-mon-hoc.csv');
  link.click();

 
  this.messageService.add({
    severity: 'success',
    summary: 'Thành công',
    detail: 'Xuất file CSV thành công!',
    life: 2000
  });
}



  onRowEditInit(course: Course) {
    this.clonedCourses[course.id as string] = { ...course };
  }

  onRowEditTrash(course: any, rowIndex: number) {
  if (confirm(`Bạn có chắc muốn xóa môn ${course.courseName}?`)) {
    this.courses.splice(rowIndex, 1);
    this.messageService.add({
      severity: 'info',
      summary: 'Đã xóa',
      detail: `Đã xóa môn ${course.courseName}`,
      life: 2000
    });
  }
}
  
  onRowEditSave(course: Course) {
    if (course.courseCode && course.courseName) {
      this.courseService.updateCourse(course);
      delete this.clonedCourses[course.id as string];
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật môn học thành công' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Thông tin không hợp lệ' });
    }
  }

  onRowEditCancel(course: Course, index: number) {
    this.courses[index] = this.clonedCourses[course.id as string];
    delete this.clonedCourses[course.id as string];
  }

  getSeverity(status: string): 'success' | 'info' | 'warn' | 'secondary' | 'contrast' | 'danger' | null {
  switch (status) {
    case 'APPROVED':
      return 'success';
    case 'PENDING':
      return 'warn';
    case 'REJECTED':
      return 'danger';
    default:
      return null;
  }
}
registerSubjects(form: any) {
  if (this.selectedSubjects.length > 0) {
    this.selectedSubjects.forEach((subj) => {
      const newCourse = {
        id: Math.random().toString(36).substring(2),
        courseCode: subj.code,
        courseName: subj.name,
        credit: 3,
        status: 'ĐÃ ĐĂNG KÝ',
      };
      this.courses.push(newCourse);
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Đăng ký môn học thành công!',
      life: 3000,
    });

    this.selectedSubjects = [];
    form.resetForm();
  } else {
    this.messageService.add({
      severity: 'warn',
      summary: 'Cảnh báo',
      detail: 'Vui lòng chọn ít nhất một môn học!',
      life: 3000,
    });
  }
}

}

