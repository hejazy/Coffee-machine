
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export default (app) => {
    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
        .setTitle('Coffee API')
        .setDescription(`
An API build on demond of SWENSON HE Request 

Note:

    this API need to install mongo DB

    the ref-name is only a temp name to be used to show the product names like your example CM102.
        `)
        .setVersion('1.0')
        .build(),
        );
    SwaggerModule.setup('swagger-api/', app, document);
};
