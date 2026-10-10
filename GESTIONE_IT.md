# SPARTIAN — guida rapida per Ivo e Leo

## Aprire la demo sul proprio PC

1. Installa Node.js 22 se manca.
2. Estrai questo archivio ed entra nella cartella `spartian-real-estate`.
3. Apri il terminale nella cartella e lancia `npm ci`, poi `npm run dev`.
4. Apri `http://localhost:3000`.

## Cosa provare

- **Viviendas:** combina i sei filtri e apri una scheda. Tutti gli immobili sono esempi inventati.
- **Diseña tu futuro hogar:** cambia distribuzione, materiali, pavimenti, colori, finiture e cucina. Il disegno 2D e il riepilogo cambiano. Puoi scaricare la selezione.
- **Richiesta di preventivo:** inserisci dati fittizi. La richiesta viene salvata solo nel browser: non parte nessuna email.
- **Panel demo:** link nel footer oppure `/admin/demo`. Qui puoi creare/modificare/eliminare immobili, progetti e articoli, cambiare immagini e prezzi, gestire richieste e attivare/disattivare le opzioni del configuratore.
- **Reset:** in Resumen puoi esportare i dati JSON e ripristinare gli esempi iniziali. Il ripristino elimina le modifiche locali. L'importazione del backup non è inclusa.

Ogni browser ha la propria copia. Le modifiche fatte da Leo non diventano visibili a Ivo. Cancellare i dati del browser elimina la demo modificata: esporta prima di farlo. Non inserire contatti o documenti reali.

## Pubblicazione su Netlify

Il codice è pronto per una build Next.js. Il repository dedicato è https://github.com/Iamywh/spartian-real-estate. L’accesso a Netlify è ancora da completare. **Non esiste ancora un deployment verificato di questa consegna.**

1. Il repository dedicato `Iamywh/spartian-real-estate` è stato creato dall’utente ed è pubblico.
2. Usa esclusivamente questo repository per gli aggiornamenti di SPARTIAN.
3. In Netlify importa il nuovo repository, ramo `main`.
4. Build: `npm run build`; directory pubblicazione: `.next`; Node: `22`.
5. Per la demo non servono variabili d'ambiente. Il file `netlify.toml` contiene le impostazioni.
6. Scegli `spartian-real-estate` come nome se disponibile. Controlla il link reale generato da Netlify prima di inviarlo a Leo.
7. Dopo il collegamento GitHub, ogni aggiornamento del ramo `main` avvia il deployment automatico.

Nessun dominio o servizio a pagamento è stato acquistato. Il repository privato non rende privato il sito. La demo contiene solo esempi; prima di inserire informazioni riservate occorre proteggerne l'accesso.

## Area amministrativa riservata

`/admin` contiene il flusso di accesso Supabase predisposto. Senza configurazione resta chiuso. `/admin/demo` è invece un ambiente pubblico di prova: non è una barriera di sicurezza.

Il README spiega come configurare un nuovo progetto Supabase, invitare utenti e assegnare i ruoli. Anche attivando il login, questa versione gestisce ancora dati locali: il database condiviso e lo storage immagini devono essere collegati e testati prima dell'uso reale.

## Prima del lancio commerciale

Servono dati societari e contatti verificati, contenuti immobiliari reali e relativi permessi, documenti legali definitivi, backend condiviso, invio email e verifica completa di sicurezza e privacy. Le traduzioni IT/EN e il rendering 3D sono sviluppi futuri. Il sito resta noindex fino all'approvazione del lancio.
