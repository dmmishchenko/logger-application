import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoggerModule } from './logger/logger.module';
import { LOGGER_CONFIG_TOKEN } from './logger/tokens';
import { LoggerConfig } from './logger/interfaces/logger-config.interface';

const config: LoggerConfig = {
  messageFormat: '[ERROR] {message}',
  targets: ['console', 'localStorage'],
  useQueue: true,
  flushInterval: 5000,
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LoggerModule],
  providers: [{ provide: LOGGER_CONFIG_TOKEN, useValue: config }],
  bootstrap: [AppComponent],
})
export class AppModule {}
