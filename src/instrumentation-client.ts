// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://7f85a54c96cf6873de974bb18bef601d@o4510150449233920.ingest.us.sentry.io/4510150452183051",

  // Add optional integrations for additional features
  integrations: [
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration({
      colorScheme: "#system",
      showBranding: false,
      isEmailRequired: true,
      enableScreenshot: true,
      triggerLabel: "Relatar problema",
      formTitle: "Relatar problema",
      submitButtonLabel: "Enviar",
      cancelButtonLabel: "Cancelar",
      confirmButtonLabel: "Confirmar",
      addScreenshotButtonLabel: "Adicionar imagem da tela",
      removeScreenshotButtonLabel: "Remover imagem",
      nameLabel: "Nome",
      amePlaceholder: "Seu nome",
      emailLabel: "Email",
      emailPlaceholder: "oi@cotaindie.com",
      isRequiredLabel: "(obrigatório)",
      messageLabel: "Descrição",
      messagePlaceholder: "Descreva o que aconteceu...",
      successMessageText:
        "Obrigado! Estaremos resolvendo o probelma o quanto antes.",
    }),
  ],
  tracesSampleRate: 1,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
