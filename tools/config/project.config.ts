import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // 使用$符号需要此依赖
      {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},

      // Video 库依赖，如果项目不需要可以移除 - 样式库，解码库
      { src: 'hls.js/dist/hls.js', inject: 'libs' },
      { src: 'videogular2/fonts/videogular.css', inject: true }
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    this.ROLLUP_INCLUDE_DIR = [
      ...this.ROLLUP_INCLUDE_DIR,
      //'node_modules/moment/**'
    ];

    this.ROLLUP_NAMED_EXPORTS = [
      ...this.ROLLUP_NAMED_EXPORTS,
      //{'node_modules/immutable/dist/immutable.js': [ 'Map' ]},
      // Video
      {'node_modules/videogular2/core.js': [ 'VgCoreModule' ]},
      {'node_modules/videogular2/controls.js': [ 'VgControlsModule' ]},
      {'node_modules/videogular2/overlay-play.js': [ 'VgOverlayPlayModule' ]},
      {'node_modules/videogular2/buffering.js': [ 'VgBufferingModule' ]},
      {'node_modules/videogular2/streaming.js': [ 'VgStreamingModule' ]},
      // Highcharts
      {'node_modules/highcharts/highcharts.js': [ 'setOptions', 'chart', 'Color' ]},
    ];

    // rxjs
    this.SYSTEM_BUILDER_CONFIG.paths['rxjs/operators'] = 'node_modules/rxjs/operators/index.js';

    // Video 库配置
    const videoAngular2Packages: ExtendPackages[] = [{
      name: 'videogular2',
      // Path to the package's bundle
      path: 'node_modules/videogular2',
      packageMeta: {
        defaultExtension: 'js',
        // main: 'dist/lib/index', possibly required for your package, see description below
      }
    }];
    // Highcharts 库配置
    const highchartsPackages: ExtendPackages[] = [{
      name: 'highcharts',
      // Path to the package's bundle
      path: 'node_modules/highcharts',
      packageMeta: {
        defaultExtension: 'js',
        main: 'highcharts'
      }
    }];
    // MQTT 库配置, 使用此依赖不能使用rollup
    const mqttPackages: ExtendPackages[] = [{
      name: 'ng2-mqtt/mqttws31',
      // Path to the package's bundle
      path: 'node_modules/ng2-mqtt',
      packageMeta: {
        defaultExtension: 'js',
        main: 'mqttws31'
      }
    }];
    // Google Protobuf
    const protobufjsPackages: ExtendPackages[] = [
      {
        name: 'protobufjs',
        // Path to the package's bundle
        path: 'node_modules/protobufjs',
        packageMeta: {
          defaultExtension: 'js',
          main: 'index'
        }
      },
      {
      name: '@protobufjs/aspromise',
      // Path to the package's bundle
      path: 'node_modules/@protobufjs/aspromise',
      packageMeta: {
        defaultExtension: 'js',
        main: 'index'
      }
    },
    {
      name: '@protobufjs/base64',
      // Path to the package's bundle
      path: 'node_modules/@protobufjs/base64',
      packageMeta: {
        defaultExtension: 'js',
        main: 'index'
      }
    },
    {
      name: '@protobufjs/codegen',
      // Path to the package's bundle
      path: 'node_modules/@protobufjs/codegen',
      packageMeta: {
        defaultExtension: 'js',
        main: 'index'
      }
    },
    {
      name: '@protobufjs/eventemitter',
      // Path to the package's bundle
      path: 'node_modules/@protobufjs/eventemitter',
      packageMeta: {
        defaultExtension: 'js',
        main: 'index'
      }
    },
    {
      name: '@protobufjs/fetch',
      // Path to the package's bundle
      path: 'node_modules/@protobufjs/fetch',
      packageMeta: {
        defaultExtension: 'js',
        main: 'index'
      }
    },
    {
      name: '@protobufjs/float',
      // Path to the package's bundle
      path: 'node_modules/@protobufjs/float',
      packageMeta: {
        defaultExtension: 'js',
        main: 'index'
      }
    },
    {
      name: '@protobufjs/inquire',
      // Path to the package's bundle
      path: 'node_modules/@protobufjs/inquire',
      packageMeta: {
        defaultExtension: 'js',
        main: 'index'
      }
    },
    {
      name: '@protobufjs/path',
      // Path to the package's bundle
      path: 'node_modules/@protobufjs/path',
      packageMeta: {
        defaultExtension: 'js',
        main: 'index'
      }
    },
    {
      name: '@protobufjs/pool',
      // Path to the package's bundle
      path: 'node_modules/@protobufjs/pool',
      packageMeta: {
        defaultExtension: 'js',
        main: 'index'
      }
    },
    {
      name: '@protobufjs/utf8',
      // Path to the package's bundle
      path: 'node_modules/@protobufjs/utf8',
      packageMeta: {
        defaultExtension: 'js',
        main: 'index'
      }
    }];
    const additionalPackages: ExtendPackages[] = [ ...videoAngular2Packages, ...highchartsPackages,
      ...mqttPackages, ...protobufjsPackages];
    this.addPackagesBundles(additionalPackages);

    // Add packages (e.g. ng2-translate)
    // const additionalPackages: ExtendPackages[] = [{
    //   name: 'ng2-translate',
    //   // Path to the package's bundle
    //   path: 'node_modules/ng2-translate/bundles/ng2-translate.umd.js'
    // }];
    //
    // this.addPackagesBundles(additionalPackages);

    /* Add proxy middleware */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')('/api', { ws: false, target: 'http://localhost:3003' })
    // ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
