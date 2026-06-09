import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@types': resolve(__dirname, 'src/app/shared/types/index.ts'),
      '@constants': resolve(__dirname, 'src/app/shared/constants/index.ts'),
      '@ui': resolve(__dirname, 'src/app/shared/components/ui'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'text'],
      reportsDirectory: 'coverage',
      include: ['src/**/*.ts'],
      exclude: ['src/main.ts', 'src/**/*.spec.ts', 'src/environments/**'],
    },
  },
});
