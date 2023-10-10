import { InjectionToken } from '@angular/core';
import { LoggerTarget } from './logger-target.interface';

export interface LoggerConfig {
  /** example '[ERROR] {message}' */
  messageFormat: MessageFormat;
  targets: TargetType[];
  useQueue: boolean;
  /** Default value is 5000 */
  flushInterval: number;
}

export type MessageFormat = `${string}{message}${string}`;

export type TargetType =
  | 'console'
  | 'localStorage'
  | InjectionToken<LoggerTarget>;
