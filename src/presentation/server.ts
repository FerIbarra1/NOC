import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
)
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
)



const emailService = new EmailService();

export class Server {
    public static start() {
        console.log('Server started...');

        // new SendEmailLogs(emailService, fileSystemLogRepository).execute('fernandooibarra@gmail.com')
        // emailService.sendEmailWithFileSystemLogs('fernandooibarra@gmail.com');

        // emailService.sendEmail({
        //     to: 'fernandooibarra@gmail.com',
        //     subject: 'Logs de sistema',
        //     htmlBody: `
        //     <h3>Logs de sistema - NOC</h3>
        //     <p>Hola Fernando,</p>
        //     <p>Estos son los logs de sistema:</p>
        //     `
        // })

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://www.google.com'
        //         new CheckServiceMultiple(
        //             [fsLogRepository, mongoLogRepository, postgresLogRepository],
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url);
        //     }
        // );

    }
}