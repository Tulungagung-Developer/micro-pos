import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ControllerModule } from '@ctrl/controller.module';
import { CoreModule } from '@core/core.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { EnvConfig } from '@conf/env.config';

@Module({})
class ProductionModule {
  static register(): DynamicModule {
    const module = {
      module: ProductionModule,
      imports: [] as DynamicModule[],
      providers: [] as Provider[],
    };

    if (EnvConfig.const.IS_PRODUCTION) {
      module.imports.push(LoggerModule.forRoot());

      return module;
    }

    return {
      module: ProductionModule,
    };
  }
}

@Global()
@Module({
  imports: [ProductionModule.register(), CacheModule.register({ isGlobal: true }), ControllerModule, CoreModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [CoreModule],
})
export class MainModule {}
