import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseApiUrl } from '../environments/environments';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http: HttpClient) { }

  sendQuestionAndGetAnswer(req: Message): Observable<Message> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Message>(
      baseApiUrl + 'api/Chatbot/ask',
      req,
      { headers: headers }
    );
  }
}
