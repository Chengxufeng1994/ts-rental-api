import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { UserSeeder } from './user.seeder';
import { ScooterSeeder } from './scooter.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  const userSeeder = app.get(UserSeeder);
  await userSeeder.seed();
  const scooterSeeder = app.get(ScooterSeeder);
  await scooterSeeder.seed();
  await app.close();
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
