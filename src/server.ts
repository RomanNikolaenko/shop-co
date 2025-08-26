import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { AngularNodeAppEngine, createNodeRequestHandler, isMainModule, writeResponseToNodeResponse } from '@angular/ssr/node';
import express, { static as expressStatic } from 'express';

// Отримуємо __dirname у ES модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const browserDistFolder = join(__dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Приклад REST API endpoint
 */
// app.get('/api/example', (req, res) => {
//   res.json({ message: 'Hello from API!' });
// });

/**
 * Обслуговуємо статичні файли з папки browser
 */
app.use(
  expressStatic(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Обробка всіх інших запитів через Angular SSR
 */
app.use(async(req, res, next) => {
  try {
    const response = await angularApp.handle(req);
    if (response) {
      writeResponseToNodeResponse(response, res);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

/**
 * Запуск сервера, якщо це головний модуль
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Експорт обробника запитів для хмарних функцій, Vercel, Firebase тощо
 */
export default createNodeRequestHandler(app);
