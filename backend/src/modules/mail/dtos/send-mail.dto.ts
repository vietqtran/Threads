export type WelcomeTemplateParams = {
    name: string
}

export class SendMailDto {
    to: string
    subject: string
    template: string
    context: WelcomeTemplateParams
}
