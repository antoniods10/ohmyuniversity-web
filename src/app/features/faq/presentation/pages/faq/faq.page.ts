import { Component } from '@angular/core';
import { FaqHeroComponent } from '../../components/faq-hero/faq-hero.component';
import { FaqListComponent, FaqCategory } from '../../components/faq-list/faq-list.component';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [FaqHeroComponent, FaqListComponent],
  templateUrl: './faq.page.html',
})
export class FaqPage {
  readonly categories: FaqCategory[] = [
    {
      title: 'Accesso e autenticazione',
      items: [
        {
          question: 'Come accedo a OhMyUniversity?',
          answer:
            'Accedi tramite il sistema SSO del tuo ateneo. Dalla pagina di login, cerca il nome della tua università, clicca su "Accedi" e verrai reindirizzato al portale istituzionale. Dopo aver inserito le tue credenziali universitarie, tornerai automaticamente su OhMyUniversity con la sessione attiva.',
        },
        {
          question: 'OhMyUniversity memorizza la mia password universitaria?',
          answer:
            'No. Le tue credenziali universitarie non transitano mai per i nostri server. Il login avviene direttamente sul portale del tuo ateneo tramite protocollo SSO sicuro. OhMyUniversity riceve solo un token di autenticazione anonimo che conferma che sei un utente valido.',
        },
        {
          question: 'Il mio ateneo è supportato?',
          answer:
            'Attualmente supportiamo oltre 50 atenei italiani. Puoi verificare se il tuo ateneo è nella lista direttamente dalla pagina di login cercando il nome. Se non lo trovi, puoi segnalarcelo tramite la pagina dei contatti - stiamo lavorando continuamente per aggiungere nuovi atenei.',
        },
        {
          question: "Cosa succede quando mi laureo o termino il mio rapporto con l'ateneo?",
          answer:
            "L'accesso a OhMyUniversity è legato al tuo account istituzionale. Quando l'ateneo disattiva le tue credenziali (tipicamente qualche mese dopo la laurea o la fine del contratto), l'accesso a OhMyUniversity si disattiverà automaticamente. I tuoi dati vengono conservati per 12 mesi prima di essere eliminati definitivamente.",
        },
        {
          question: 'Posso accedere da più dispositivi contemporaneamente?',
          answer:
            'Sì. Puoi accedere da browser desktop, app mobile e qualsiasi altro dispositivo contemporaneamente. Le sessioni sono indipendenti e puoi effettuare il logout da uno specifico dispositivo dalle impostazioni del tuo profilo.',
        },
      ],
    },
    {
      title: 'Funzionalità e dati',
      items: [
        {
          question: 'Da dove provengono i miei dati accademici?',
          answer:
            "I dati accademici (esami, voti, piano di studi, CFU) vengono recuperati direttamente dal sistema gestionale del tuo ateneo tramite le API ufficiali messe a disposizione dall'istituzione. OhMyUniversity non modifica né integra questi dati - li visualizza così come sono nei sistemi dell'ateneo.",
        },
        {
          question: 'Con quale frequenza si aggiornano i dati?',
          answer:
            "La frequenza di aggiornamento dipende dall'integrazione con il tuo ateneo. Nella maggior parte dei casi i dati vengono sincronizzati entro poche ore dalla registrazione di un voto o di una variazione al piano di studi. In caso di ritardi anomali, puoi forzare l'aggiornamento manuale dalle impostazioni della tua dashboard.",
        },
        {
          question: 'I dati su OhMyUniversity sono ufficiali?',
          answer:
            'I dati hanno natura informativa. OhMyUniversity è uno strumento di visualizzazione - in caso di discrepanze con il portale ufficiale del tuo ateneo, fa sempre fede il dato presente nei sistemi istituzionali. Non usare OhMyUniversity come fonte primaria per documenti ufficiali (ad esempio la carriera per la domanda di laurea).',
        },
        {
          question: 'Come viene calcolata la media ponderata?',
          answer:
            'La media ponderata viene calcolata moltiplicando il voto di ogni esame per i CFU corrispondenti, sommando tutti i prodotti e dividendo per il totale dei CFU. Il calcolo segue lo standard italiano (voti da 18 a 30, con eventuale lode). Puoi vedere il dettaglio del calcolo espandendo la sezione "Media" nella tua dashboard.',
        },
        {
          question: 'Posso esportare i miei dati?',
          answer:
            'Sì. Dalle impostazioni del profilo puoi esportare il riepilogo della tua carriera in formato PDF o CSV. La funzione di esportazione è disponibile per tutti gli utenti accademici registrati.',
        },
      ],
    },
    {
      title: 'Privacy e sicurezza',
      items: [
        {
          question: 'I miei dati vengono venduti o condivisi con terzi?',
          answer:
            'No. OhMyUniversity non vende dati a terzi e non condivide informazioni personali con inserzionisti o piattaforme di marketing. I dati vengono utilizzati esclusivamente per fornire il servizio. Per i dettagli completi consulta la nostra Privacy Policy.',
        },
        {
          question: 'Come posso richiedere la cancellazione dei miei dati?',
          answer:
            "Puoi richiedere la cancellazione dei tuoi dati in qualsiasi momento scrivendo a privacy@ohmyuniversity.it. Risponderemo entro 30 giorni. Nota che la cancellazione dell'account non è possibile finché hai una sessione SSO attiva con il tuo ateneo - dovrai prima effettuare il logout.",
        },
        {
          question: 'OhMyUniversity utilizza cookie?',
          answer:
            "Utilizziamo un numero minimo di cookie tecnici necessari al funzionamento del servizio: il cookie di sessione (per mantenerti autenticato), un token di sicurezza CSRF e un cookie per le preferenze dell'interfaccia (tema, lingua). Non utilizziamo cookie pubblicitari o di profilazione. Per i dettagli consulta la nostra Cookie Policy.",
        },
      ],
    },
    {
      title: 'Supporto',
      items: [
        {
          question: 'Come posso segnalare un problema o un bug?',
          answer:
            'Puoi segnalare problemi aprendo una issue su GitHub (il progetto è open source) oppure scrivendo a hello@ohmyuniversity.it. Per i bug ti chiediamo di includere il browser utilizzato, i passi per riprodurre il problema e uno screenshot se possibile.',
        },
        {
          question: "OhMyUniversity ha un'app mobile?",
          answer:
            "Sì, l'app è disponibile su App Store (iOS) e Google Play (Android). L'app offre le stesse funzionalità della versione web, con l'aggiunta delle notifiche push per scadenze e risultati degli esami.",
        },
        {
          question: 'Come posso contribuire al progetto?',
          answer:
            'OhMyUniversity è open source. Puoi contribuire con codice, design, documentazione o semplicemente segnalando bug su GitHub. Visita la pagina Chi Siamo per scoprire come entrare nella community di OhMyOpenSource!',
        },
      ],
    },
  ];
}
