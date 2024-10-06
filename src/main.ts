import { mount } from 'svelte';
import App from './routes/app.svelte';

const app = mount(App, { target: document.getElementById('root')! });

export default app;
