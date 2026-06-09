import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
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
