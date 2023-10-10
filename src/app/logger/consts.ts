import { LoggerConfig, TargetType } from './interfaces/logger-config.interface';

export const DEFAULT_INTERVAL_MS = 5000;

export const DEFAULT_TARGETS: TargetType[] = ['console', 'localStorage'];

export const DEFAULT_MESSAGE_FORMAT = '[ERROR] {message}';

export const MOCK_CONFIG: LoggerConfig = {
  useQueue: true,
  targets: ['console', 'localStorage'],
  flushInterval: 2000, // 2 seconds
  messageFormat: '{message}',
};
