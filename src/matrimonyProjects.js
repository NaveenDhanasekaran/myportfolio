// Projects built at Matrimony.com (Decision Support System team).
// `group` drives the filter on the home page; `category` is the label shown on the card.
// Each entry renders as a card on the home page and as its own detail page at #/matrimony/<slug>.

export const company = {
  name: 'Matrimony.com',
  role: 'AI Engineer',
  team: 'Decision Support System (DSS) team',
  duration: '1 year 3 months',
  intro:
    'At Matrimony.com I worked in the Decision Support System team, the group responsible for the company’s data warehouse and the reporting built on it. My work was to replace manual, request-driven processes with tools: a data platform people could question in plain English, AI pipelines for sales calls and compliance, and detection systems for fraud and abuse.',
};

export const matrimonyProjects = [
  {
    slug: 'matrieval',
    group: 'Data platform',
    title: 'Matrieval',
    category: 'Data platform',
    summary:
      'The DSS team’s internal platform. It puts the company’s data estate behind one web interface so people who are not database engineers can get answers without raising a request.',
    stack: ['Python', 'Flask', 'Hive', 'Vertica', 'MySQL', 'PostgreSQL', 'Google Gemini', 'APScheduler', 'Chart.js'],
    facts: [
      { label: 'HTTP routes', value: '299' },
      { label: 'Scheduled jobs', value: '21' },
      { label: 'Databases connected', value: '~50' },
    ],
    problem: [
      'The company’s data sits across a Hadoop/Hive data lake, a Vertica warehouse and around fifty production MySQL databases. Every question from sales, legal or operations became a ticket in the data team’s queue, and many recurring reports were assembled by hand each morning.',
    ],
    built: [
      'Matrieval started as an English-to-SQL tool and grew into the team’s operational platform. It now covers four kinds of work:',
    ],
    builtList: [
      'Ask: natural-language questions answered as SQL and results, in the browser, in Slack and in Telegram.',
      'Look: role-scoped dashboards for the telesales hierarchy, from individual agent up to business head.',
      'Check: compliance and quality tooling, including legal reports, fraud scanning, migration validation and ETL diagnosis.',
      'Run: scheduled pipelines that generate data, sync databases and post daily summaries with nobody watching.',
    ],
    highlights: [
      {
        title: 'Read-only by construction',
        text: 'Data is never copied into the platform. Every query runs against the source system through a guard that rejects any write or schema change before it reaches a server.',
      },
      {
        title: 'Access scoped by role',
        text: 'Staff sign in with their corporate directory account. What each person can see is narrowed to their place in the sales hierarchy: an agent sees their own numbers, a branch head sees their branch.',
      },
      {
        title: 'Safe scheduling across environments',
        text: 'Twenty-one jobs run inside the application. A primary/secondary role switch stops development and production from both sending the same report or running the same destructive sync.',
      },
      {
        title: 'Hive queries that can actually be cancelled',
        text: 'Long Hive queries run through an asynchronous runner that reports live status and the cluster job id, and whose Cancel stops the work on the cluster rather than just in the browser.',
      },
    ],
    outcome: [
      'Each capability replaced a manual process that previously took a data engineer’s time. The features listed below as separate projects are all part of this platform.',
    ],
  },
  {
    slug: 'jarvis',
    group: 'Data platform',
    title: 'Jarvis data assistant',
    category: 'Conversational AI',
    summary:
      'A chat assistant that answers data and pipeline questions from one shared engine, whether it is asked in the web app, in Slack or in Telegram.',
    stack: ['Python', 'Google Gemini function calling', 'Slack Socket Mode', 'Telegram Bot API'],
    facts: [
      { label: 'Read-only tools', value: '28' },
      { label: 'Chat channels', value: '3' },
    ],
    problem: [
      'Managers and engineers asked the data team the same questions every day: which table holds this, why did this report not refresh, why did last night’s load fail. Each answer meant someone stopping their own work to look it up.',
    ],
    built: [
      'The assistant uses Gemini’s native function calling. The model is given a curated set of 28 read-only tools — browsing servers and tables, running vetted queries, checking report refresh status, diagnosing ETL failures, starting the fraud report — and decides which to call. It never writes free-form SQL against production.',
      'The answering logic knows nothing about any chat application. Slack and Telegram are thin adapters around one core, each with its own limits for message size, formatting and attachments.',
    ],
    highlights: [
      {
        title: 'Confirmation before acting',
        text: 'Any tool that changes something in the world rather than reading it must state exactly what it will do and wait for explicit confirmation in a following message.',
      },
      {
        title: 'One engine, many front doors',
        text: 'The same question gets the same answer on every channel. Adding a new channel means writing an adapter, not touching the answering logic.',
      },
      {
        title: 'Live access control',
        text: 'Per-channel allowlists are checked on every message, so access changes take effect immediately without a restart.',
      },
    ],
  },
  {
    slug: 'legal-reports',
    group: 'Data platform',
    title: 'Legal profile reports',
    category: 'Compliance',
    summary:
      'Produces the profile activity report requested by law enforcement and regulators in minutes, a task that previously took an engineer hours of manual querying.',
    stack: ['Python', 'Hive', 'Flask', 'python-docx'],
    problem: [
      'Law-enforcement and regulatory requests ask what a given profile did on the platform. Assembling that answer meant an engineer running a series of queries across several brands’ data and formatting the result by hand.',
    ],
    built: [
      'An officer enters a profile ID and chooses the brand. Independent Hive queries then run in parallel, each on its own connection, and results stream back section by section before being rendered as a Word document.',
      'The feature was later released as a standalone dashboard for the legal team, with its own sign-in and a monitor for running jobs.',
    ],
    highlights: [
      {
        title: 'Parallel queries',
        text: 'Because the queries run side by side, the wait is the slowest single scan rather than the sum of all of them.',
      },
      {
        title: 'Fixed a silent "not found"',
        text: 'The original lookup checked the active table and then one deleted table, so profiles in other inactive states were reported as missing. A single query across every profile state fixed it and returns the profile’s state as a by-product.',
      },
      {
        title: 'Handling inconsistent schemas',
        text: 'Profile tables disagree on column types between and within brands, so every column is normalised before the tables are combined.',
      },
    ],
  },
  {
    slug: 'migration-check',
    group: 'Data platform',
    title: 'Hive migration check',
    category: 'Data engineering',
    summary:
      'Proves that a table migrated into Hive matches its source — structure, storage, row counts, key lookups and a full row comparison — without anyone writing comparison queries.',
    stack: ['Python', 'WebHDFS', 'Hive metastore', 'SSH', 'Flask'],
    problem: [
      'The team was migrating databases into Hive. Verifying each migrated table meant hand-written comparison queries that queued for shared cluster capacity.',
    ],
    built: [
      'Pick a server, database and table on each side and compare. A database-level mode matches every table in one schema against another.',
    ],
    highlights: [
      {
        title: 'Compare the files, not the query results',
        text: 'At the data team’s request, data is read straight from the table’s HDFS files rather than through Hive. That means no cluster job, no queue wait and no load on shared capacity.',
      },
      {
        title: 'Move the bytes once',
        text: 'The comparison script is uploaded to the Hadoop edge node and run there, on the cluster’s own network, instead of pulling data across to the application server.',
      },
      {
        title: 'Hive only where unavoidable',
        text: 'Hive is used only for metadata commands and filtered counts. Those counts run through the asynchronous runner, so Cancel genuinely stops the cluster job.',
      },
    ],
  },
  {
    slug: 'contact-fraud-scan',
    group: 'Trust and safety',
    title: 'Contact-sharing fraud scan',
    category: 'Trust and safety',
    summary:
      'A daily scan that finds phone numbers and links hidden in free-text profile fields, which some members use to get around the platform.',
    stack: ['Python', 'Hive', 'pandas', 'openpyxl', 'Slack API', 'SMTP'],
    problem: [
      'Members sometimes write contact details into fields such as occupation or hobbies, often disguised so that a simple digit check will not catch them.',
    ],
    built: [
      'A detection engine with several patterns, covering plain, padded and encoded forms of a phone number, tuned so that ordinary words are not mistaken for encoded numbers. It was validated against confirmed real words and confirmed encodings.',
      'The scan runs daily for each brand in its own process, builds an Excel report and delivers it by email and to Slack. Run history, live progress and logs are available in the admin panel, and the report can be started from the chat assistant.',
    ],
    highlights: [
      {
        title: 'Precision over volume',
        text: 'Each pattern requires a valid-shaped mobile number, and encoded matches must also look deliberately unnatural, which keeps false positives low enough for a person to review the list.',
      },
      {
        title: 'Survives restarts',
        text: 'The scan runs as its own process group, so a long run survives an application restart and can still be stopped from the admin panel.',
      },
    ],
  },
  {
    slug: 'etl-diagnostics',
    group: 'Data platform',
    title: 'Report and ETL diagnostics',
    category: 'Data operations',
    summary:
      'Explains why a Tableau report did not refresh or why an ETL job failed, where the existing monitoring only said that it had.',
    stack: ['Python', 'Tableau REST API', 'MySQL', 'Gemini function calling'],
    problem: [
      'When a report’s dependencies are not met, the refresh automation skips it silently, so "not refreshed today" could mean blocked, failed or still running. ETL alerts said an object had restarted several times and nothing more.',
    ],
    built: [
      'For reports, the tool tells the three cases apart and, for a blocked report, re-runs the same dependency checks the scheduler uses to name which dependency is holding it up.',
      'For ETL objects, it returns every attempt that day with its decoded cause, whether and when the object recovered, which other objects in the same batch failed at the same moment, and when it normally finishes. Both are exposed as tools in the chat assistant.',
    ],
    highlights: [
      {
        title: 'Traps found in live data',
        text: 'Recoveries were sometimes logged under a different batch, and a "successful" error code appeared on failed rows. Grouping by object rather than by batch surfaces recoveries that the alerts never reported.',
      },
      {
        title: 'One cause, not four',
        text: 'Several objects failing in the same second is one broken batch wrapper, not several broken jobs. The tool points that out instead of listing four alerts.',
      },
    ],
  },
  {
    slug: 'call-analysis',
    group: 'AI and ML',
    title: 'Telesales call analysis',
    category: 'Speech AI',
    summary:
      'Turns telesales call recordings into structured, searchable data: quality scores, the call outcome and the reason a customer has not paid.',
    stack: ['Python', 'FastAPI', 'Google Gemini', 'PostgreSQL', 'React', 'Vite', 'Recharts', 'pm2'],
    facts: [
      { label: 'Reason categories', value: '11' },
      { label: 'Sub-categories', value: '40+' },
    ],
    problem: [
      'Telesales agents make a very large number of calls, and nobody could answer simple questions about them at scale: how the call went, whether the agent followed the pitch, why the customer did not convert. Listening to recordings by hand does not scale beyond a handful.',
    ],
    built: [
      'Recordings are uploaded or picked up from a folder. Calls belonging to the same customer are grouped and merged, so one conversation is analysed as one conversation. The audio goes to Gemini with a prompt chosen by call type, and the model returns a structured verdict that is stored in PostgreSQL.',
      'A React dashboard shows the results by agent, by quality domain and over time. Queued work is processed by a separate worker so analysis continues without anyone waiting on the web page.',
    ],
    highlights: [
      {
        title: 'A fixed taxonomy',
        text: 'The model must choose a not-paid reason from a fixed list of categories and sub-categories. A free-text reason is unusable in aggregate; a fixed list is what makes "why are customers not converting" answerable as a chart.',
      },
      {
        title: 'Separating product objections from contact complaints',
        text: 'A dedicated category for how the customer was contacted keeps a genuine "stop calling me" signal from being buried under price objections.',
      },
      {
        title: 'Never pay twice',
        text: 'Every file and call group is checked against what has already been processed before any model call, so re-running a folder does not bill or duplicate results.',
      },
      {
        title: 'Moved onto company infrastructure',
        text: 'The system was migrated from a hosted database to the company’s own PostgreSQL server, reached through a persistent tunnel and connection pool.',
      },
    ],
  },
  {
    slug: 'dlp-scanner',
    group: 'Security and mobile',
    title: 'DLP and DPDP compliance scanner',
    category: 'Security and compliance',
    summary:
      'A Windows agent that finds sensitive documents on employee machines, classifies them with an LLM and writes the classification into the file itself.',
    stack: ['Python', 'LLM via internal AI gateway', 'SQLite', 'PyInstaller'],
    problem: [
      'India’s Digital Personal Data Protection (DPDP) Act requires an organisation to know where personal data is held. In practice it sits in ordinary files on ordinary laptops: a spreadsheet of phone numbers in Downloads, a scanned ID in OneDrive.',
    ],
    built: [
      'The agent walks the file system, extracts text from Word, PDF, Excel and text files, and classifies each document’s security level, owning department and personal-data risk. Cheap rule-based detectors for financial terms and phone numbers run first; the model is reserved for what the rules cannot settle.',
      'The result is written into the document’s own metadata, so the label travels with the file, and recorded centrally. The whole tool ships as a single Windows executable.',
    ],
    highlights: [
      {
        title: 'Data stays inside the company',
        text: 'Documents are classified through the company’s own AI gateway rather than a public API, because the content being classified is exactly what the tool exists to protect.',
      },
      {
        title: 'Safe to run on people’s machines',
        text: 'File timestamps are preserved around every metadata write, so scanning does not look like tampering or disturb backup and sync tools. A report-only mode alters nothing.',
      },
      {
        title: 'Fixed a blind spot',
        text: 'Run under an IT account, the first version scanned only that account’s folders and reported a misleadingly clean result. Wildcard paths now cover every user profile on the machine.',
      },
    ],
  },
  {
    slug: 'sim-monitor',
    group: 'Security and mobile',
    title: 'SIM reputation monitor',
    category: 'Mobile',
    summary:
      'An Android app that records how incoming-call screens label the company’s outbound numbers, turning spam labelling into something the business can measure.',
    stack: ['Flutter', 'Dart', 'Kotlin', 'Android Accessibility Service', 'SQLite', 'Supabase'],
    problem: [
      'Caller-ID apps label numbers that make many outbound calls as spam or telemarketing, and customers stop answering them. Connect rates fall for a reason no internal system can see, because the label exists only on the screen of the phone being called.',
    ],
    built: [
      'The app runs on test handsets that receive calls from the company’s numbers. When a call arrives, it reads what the incoming-call screen displays — caller name and any spam or fraud label — and captures a screenshot as evidence.',
      'Records are written to the device first and synced to a central database when a connection is available, so each number’s reputation becomes a queryable dataset.',
    ],
    highlights: [
      {
        title: 'Flutter and native Kotlin together',
        text: 'Flutter cannot read another app’s screen, so capture is done by a native accessibility service and passed to the Flutter interface over a platform channel.',
      },
      {
        title: 'Staying alive on Android',
        text: 'A foreground service, a battery-optimisation exemption and a boot receiver keep monitoring running through power management and reboots.',
      },
      {
        title: 'Offline first',
        text: 'Capture never depends on the network; a handset with poor connectivity loses nothing.',
      },
    ],
  },
  {
    slug: 'ai-interviewer',
    group: 'AI and ML',
    title: 'AI interview platform',
    category: 'HR technology',
    summary:
      'A voice-based screening interview system. Candidates apply, the system reads their resume, asks tailored questions aloud and scores the answers for the HR team.',
    stack: ['Python', 'Flask', 'MySQL', 'Grok (xAI)', 'Web Speech API', 'MediaPipe', 'YOLOv8'],
    problem: [
      'First-round screening interviews take a large share of recruiters’ time and are hard to keep consistent from one candidate to the next.',
    ],
    built: [
      'Candidates browse open positions and upload a resume, which is parsed and scored against the job description. The interview is generated per candidate — questions on their own experience, technical questions and behavioural questions — and conducted by voice, with answers transcribed as they speak.',
      'Each answer is evaluated in context, and the HR team receives an overall assessment with strengths, gaps, a suitability score and the full transcript in an admin panel.',
    ],
    highlights: [
      {
        title: 'Proctoring',
        text: 'Face detection flags missing or multiple faces, object detection flags phones and other devices, and a voice-consistency check helps confirm the same person answers throughout.',
      },
      {
        title: 'Adaptive questioning',
        text: 'If a candidate struggles with a question, it can be rephrased more simply rather than skipped.',
      },
    ],
  },
  {
    slug: 'photo-verification',
    group: 'AI and ML',
    title: 'Profile photo verification',
    category: 'Computer vision',
    summary:
      'Batch verification that two profile photos show the same person, built to cope with glasses and partial occlusion.',
    stack: ['Python', 'Flask', 'DeepFace', 'FaceNet', 'ArcFace', 'RetinaFace', 'MTCNN', 'MediaPipe'],
    problem: [
      'Checking that the photos on a profile belong to the same person was a manual review task, and simple face matching failed on everyday variations such as glasses.',
    ],
    built: [
      'A web tool that takes a list of image pairs, verifies each pair with two face-recognition models and streams the results live, with match status, distance, threshold and the detector used. Results export to CSV.',
    ],
    highlights: [
      {
        title: 'Detector fallback',
        text: 'If one face detector fails on an image, the next is tried, which recovers many photos that a single detector would reject.',
      },
      {
        title: 'Two models, one verdict',
        text: 'Running FaceNet and ArcFace side by side gives a more reliable decision than either alone.',
      },
      {
        title: 'Evaluated against LLM vision',
        text: 'Compared the embedding approach with general-purpose vision language models on the same pairs to decide which to use in production.',
      },
    ],
  },
  {
    slug: 'duplicate-profiles',
    group: 'Trust and safety',
    title: 'Duplicate profile detection',
    category: 'Trust and safety',
    summary:
      'Finds members who return under a new profile after a previous one was deleted, by matching active profiles against deleted ones.',
    stack: ['Python', 'pandas', 'RapidFuzz', 'MySQL', 'Vertica'],
    problem: [
      'Members removed for misuse can register again under a slightly different name. Spotting them by eye across thousands of profiles is not practical.',
    ],
    built: [
      'Candidate pairs of active and deleted profiles are enriched from the warehouse, then compared on name and date of birth. Names are normalised and scored with several fuzzy-matching methods, keeping the best score, and each pair is placed in a match category for review.',
    ],
    highlights: [
      {
        title: 'Robust name matching',
        text: 'Combining several fuzzy-matching algorithms handles reordered names, initials and spelling variations that any single method misses.',
      },
      {
        title: 'Reports people can act on',
        text: 'Output ranges from a full report to a short summary of strong matches, so the review team starts with the most likely cases.',
      },
    ],
  },
  {
    slug: 'abuse-detection',
    group: 'Trust and safety',
    title: 'Abusive message detection',
    category: 'Trust and safety',
    summary:
      'Flags abusive messages between members with a severity level and category, using a locally hosted language model.',
    stack: ['Python', 'pandas', 'Local LLM', 'RapidFuzz'],
    problem: [
      'Reported messages had to be read and categorised by hand, and most of the volume was standard template text that never needed review.',
    ],
    built: [
      'Messages are first filtered with fuzzy matching to remove default and template text, so the model only sees what members actually wrote. The model then assigns a severity and a main and sub-category, and the results are validated against the categories used for reported abuse.',
    ],
    highlights: [
      {
        title: 'Local model',
        text: 'Running the model on internal infrastructure keeps members’ private messages inside the company.',
      },
      {
        title: 'Cheap filtering first',
        text: 'Removing template messages before the model runs cuts processing time and cost substantially.',
      },
    ],
  },
  {
    slug: 'fraud-detection-poc',
    group: 'Trust and safety',
    title: 'Profile fraud detection prototype',
    category: 'Trust and safety',
    summary:
      'A proof of concept that scores profiles for fraud risk by combining Claude on Amazon Bedrock with business rules.',
    stack: ['Python', 'Streamlit', 'Amazon Bedrock', 'Claude', 'pandas'],
    problem: [
      'The team wanted to know whether a large language model could add useful signal to rule-based fraud detection before investing in a production system.',
    ],
    built: [
      'A Streamlit application with three modes: rule-based scoring on activity thresholds, AI scoring with Claude, and a hybrid that weights the two. A built-in synthetic data generator made it possible to test at scale without using member data, and each profile receives a risk level, a fraud probability and an explanation.',
    ],
    highlights: [
      {
        title: 'Side-by-side comparison',
        text: 'Running all three modes on the same data made the value of the model measurable rather than assumed.',
      },
      {
        title: 'No member data needed',
        text: 'Synthetic profiles with a controlled fraud rate allowed the prototype to be built and demonstrated safely.',
      },
    ],
  },
];
