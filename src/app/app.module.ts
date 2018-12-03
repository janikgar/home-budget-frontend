import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import { AppComponent } from './app.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { TableComponent } from './table/table.component';
import { MessageComponent } from './message/message.component';

import { MessageChannelService } from './message/message-channel.service';
import { GoogleAuthService } from './googleAuth/google-auth.service';
import { SafeHtmlPipe } from './safe-html.pipe';
import { AuthFinishComponent } from './auth-finish/auth-finish.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    JumbotronComponent,
    TableComponent,
    MessageComponent,
    SafeHtmlPipe,
    AuthFinishComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    GoogleAuthService,
    MessageChannelService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
