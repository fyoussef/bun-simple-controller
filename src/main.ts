import { AppFactory } from "./common";
import { AppModule } from "./module";

function bootstrap() {
  const app = AppFactory.create(AppModule);

  app.listen(3000);
}
bootstrap();
