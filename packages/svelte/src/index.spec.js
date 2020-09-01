import { htmlLoader, errorHtmlLoader } from './index';
import Component from '../test-helpers/compiledComponent';

describe('render HTML', () => {
  it('should return rendered HTML of component', async () => {
    const res = {
      locals: {},
    };
    await htmlLoader(
      {
        query: {},
        params: {
          component: 'Component.svelte',
        },
        id: 3,
        locals: {
          component: 'component',
          componentProps: {},
          ResolvedComponent: Component,
        },
      },
      res,
      () => null,
    );
    expect(res.locals.html).toEqual(`
          <style>h1.svelte-c33f9i{background-color:red}</style>
          <div
              data-ssr-aas-component="component"
              data-ssr-aas-id="se_embed_svelte_ssr_3"
          ><h1 class="svelte-c33f9i">Hello world!</h1></div>
          <script>
              window.__SSR_AAS_LOAD_PROPS__ ||= {};
              window.__SSR_AAS_LOAD_PROPS__[3] = {};
          </script>
      `);
  });
  it('should set an error', async () => {
    const res = {
      locals: {},
    };
    await htmlLoader(
      {
        query: {},
        params: {
          component: 'Component.svelte',
        },
        id: 3,
        locals: {
          component: 'component',
          componentProps: {},
          ResolvedComponent: {},
        },
      },
      res,
      () => null,
    );
    expect(res.locals.error).not.toBeUndefined();
  });
});

describe('handle svelte rendering error', () => {
  it('should return error html', async () => {
    const res = {
      locals: {},
    };
    await errorHtmlLoader(
      {
        locals: {
          component: 'component',
          componentProps: {},
          error: {
            message: 'test error message',
          },
        },
      },
      res,
      () => null,
    );
    expect(res.locals.html).not.toBeUndefined();
  });
});