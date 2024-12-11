import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    FormsModule,
    ],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const credentials = { username: this.email, password: this.password };

    this.http.post('http://127.0.0.1:8000/api/token/', credentials).subscribe({
      next: (response: any) => {

        localStorage.setItem('user', JSON.stringify({ name: this.email, token: response.access }));

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
        alert('Login falhou. Verifique suas credenciais.');
      }
    });
  }
}
