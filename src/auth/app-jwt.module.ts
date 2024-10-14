import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from 'src/config/app-config.service';

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: async (appConfigService: AppConfigService) => {
        return {
          global: true,
          secret: appConfigService.api.jwtSecret,
          signOptions: { expiresIn: appConfigService.api.jwtExpiresIn },
        };
      },
      inject: [AppConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class AppJwtModule {}
