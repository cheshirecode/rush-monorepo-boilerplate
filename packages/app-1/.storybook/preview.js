import '@unocss/reset/tailwind.css';
import '../src/styles/reset.css';
import '../src/styles/index.css';
// uno
import 'uno.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
