import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['**/*.test.{js,ts}'],
        globals: true,
        environment: 'node',
        coverage: {
            reporter: ['text', 'lcov'],
        },
    },
});