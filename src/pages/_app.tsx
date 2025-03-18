import type { AppProps } from 'next/app';
import Router from 'next/router';
import { I18nProvider } from 'next-localization';
import NProgress from 'nprogress';
import { SitecorePageProps } from 'lib/page-props';
import Bootstrap from 'src/Bootstrap';

// Using bootstrap and nprogress are completely optional.
//  bootstrap is used here to provide a clean layout for samples, without needing extra CSS in the sample app
//  nprogress provides a loading indicator on page/route changes
// Remove these in package.json as well if removed here.
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'nprogress/nprogress.css';
import 'assets/app.css';
import 'assets/global.css';
import 'assets/font.css';
// component styles which we need to change according to module
import 'assets/header.css';
import 'assets/footer.css';
import 'assets/loginLinkSection.css';
import 'assets/registerBanner.css';
import 'assets/faqJumplink.css';
import 'assets/faq.css';
import 'assets/contactUs.css';
import 'assets/title.css';
import 'assets/customerService.css';
import 'assets/payment.css';
import 'assets/formList.css';

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  return (
    <>
      <Bootstrap {...pageProps} />
      {/*
        // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
        // Note Next.js does not (currently) provide anything for translation, only i18n routing.
        // If your app is not multilingual, next-localization and references to it can be removed.
      */}
      <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
        <Component {...rest} />
      </I18nProvider>
    </>
  );
}

export default App;
