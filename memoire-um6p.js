// ═══════════════════════════════════════════════════════════════
// memoire-um6p.js — Mémoire institutionnelle UM6P partagée
// v14 (2 juin 2026) — source : v13 + présentation Al Moutmir « From Science to Impact »
//
// Mise à jour v14 (source : Prez Al Moutmir, 81 slides) :
//   - CORRECTION de cadrage Al Moutmir (B1 + B2) : n'est PAS un « pilote
//     industriel » mais un RÉSEAU DE DÉPLOIEMENT/VALIDATION AGRONOMIQUE EN CHAMP.
//     Scope explicite : bouclage TRL 7→8 pour le SEUL domaine agri (fertilisation,
//     sols, eau, mécanisation, semences, productions animales). Anti-faux-matching :
//     ne JAMAIS recommander pour chimie/matériaux/énergie.
//   - Enrichissements : mécanisme (plateformes de démonstration / réf. ICP),
//     chiffres-clés (29 300+ plateformes, 120+ agronomes/43 prov., 40k+ direct /
//     540k+ digital), PI (9 brevets mécanisation — pertinent ValorIQ), outils
//     (labos mobiles, Smart Blender, @tmar, T@swiq, Agripedia), partenaire carbone
//     Tourba/INNOV'X, contact almoutmir@ocpgroup.ma.
//
// Mise à jour v13 (sources : Tableau TRL Building materials v7 [26 solutions],
// présentations centres TTO/Cleverlytics/DICE/MAScIR-DMSD/ACME/ARC-Metallurgy/
// GEP workshop/Green H2A, inventaire pilotes QReserve fév. 2026) :
//   - NOUVEAU BLOC B5 : portefeuille solutions matériaux de construction
//     (26 solutions, TRL annoncé vs consolidé, gate, risque, PI). Câblé dans
//     technique_equip() → consommé par SYS_MAT (TESP) et SYS_TRL_MATURATION (ValorIQ).
//   - Centres matériaux documentés au niveau SOLUTIONS (GSMI, CCSE, SMR/MSN, IST&I,
//     volet matériaux MASCIR) — restaient en « appui amont » seul dans B2.
//   - TTO (Technology Transfer Office) + Cleverlytics (spin-off IA) AJOUTÉS au glossaire.
//   - GAPP (Green Ammonia Pilot Plant, Jorf Lasfar) ajouté comme pilote OCP/UM6P/IRESEN.
//   - Enrichissements : DICE (7 labs + effectifs), MAScIR DMSD (microélectronique/
//     packaging/salles blanches), ACME (4 labs), ARC Metallurgy (grades/procédés),
//     GEP (32 bancs, technos PV).
//   - GAPS CONFIRMÉS (ne pas inventer) : équipements CEPH et volet matériaux/nano
//     MAScIR — collecte QReserve CEPH/CBS « Not yet » au fév. 2026 (Khouraibchia).
//
// Réconciliation v12 (sources : Gov Framework v9 Annexe 3 [référentiel maître
// du roster, 16 entités / 4 catégories], présentation Mazagan/IART oct. 2025,
// RoE Technophos janv. 2026, présentation ITX e-Pilot + TRA fév. 2026,
// inventaires QReserve IART/Technophos/GEP, note de cadrage entités) :
//   - Plages TRL de toutes les plateformes SCOPÉES au strict 4-7 (range réel
//     en commentaire) pour éviter le sur-matching (avant : GEP 2-9, IART 5-8).
//   - IART : cadrage = RÉALITÉ DES PILOTES (phosphochimie voie sulfurique),
//     pas le cadrage mission « agro/biotech » du Framework v9.
//   - GEP : cadrage = fiche capabilities Green Energy Park (solaire/H2/
//     dessalement/biogaz), pas l'angle « F&I / procédés continus ».
//   - CEPH, MAScIR, DICE : sortis du statut « trou noir » → documentés au
//     niveau mission (Framework v9). Inventaire équipements = gap honnête,
//     NE PAS inventer d'équipement non documenté.
//   - Technophos : ajout du bloc analytique (LIBS, Infitek, réacteurs) SpectrumLab.
//   - ITX/TechCell : ajout e-Pilot (méthode itérative, outils, bénéfices chiffrés).
//   - Contacts à jour : Khouraibchia (IART gov), Boussetta (GEP), Cherkaoui (ACME),
//     Adani (OCP/Al Moutmir), Lakssir/Chraibi/Sekkat (MAScIR), Alami (DICE).
//   - Helper equipements() AJOUTÉ (alias technique_equip) : corrige le bug
//     ValorIQ qui appelait un helper inexistant.
//
// USAGE :
//   1. Déposer ce fichier à la racine de chaque repo (TESP + ValorIQ + portail)
//   2. L'inclure AVANT le script principal : <script src="memoire-um6p.js"></script>
//   3. Dans les SYS_* prompts : var SYS_MAT = "..." + window.MEM_UM6P.technique_equip() + "...";
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ───────────────────────────────────────────────────────────────
  // BLOC 1 — Glossaire officiel UM6P (TOUS les agents)
  // ───────────────────────────────────────────────────────────────
  var B1 = "\n\n=== GLOSSAIRE OFFICIEL UM6P (Mémoire Institutionnelle v12, 1 juin 2026) ===\n" +
"Utilise UNIQUEMENT ces définitions. N'invente AUCUN acronyme hors liste.\n\n" +
"REMARQUE ROSTER : le référentiel des plateformes (Framework v9, Annexe 3) compte 16 entités réparties en 4 catégories. Ce dispositif est DYNAMIQUE : chaque head d'entité est consulté annuellement, tout ajout/modification est validé par TI². Ne pas figer ; signaler si une entité semble manquer.\n\n" +
"ENTITÉS UM6P SOUS GOUVERNANCE TI² (5 hiérarchiques) :\n" +
"- IART = Institute of Applied Research and Technology — pilotes procédés phosphate/chimie voie sulfurique (Mazagan/Jorf Lasfar, 4 ha). Rattachement HIÉRARCHIQUE TI².\n" +
"- CEPH = Expertise Center for Phosphate (anciennement Centre d'Excellence Plantes/Horticulture) — chimie des phosphates de spécialité (pharma/food/battery-grade) + caractérisation. Rattachement HIÉRARCHIQUE TI².\n" +
"- DICE = Disruptive Innovation Centre for Excellence — Digital, IA, IoT, jumeaux numériques, scale-up digital. Rattachement HIÉRARCHIQUE TI².\n" +
"- ACME = Africa Center of Manufacturing Excellence (Nouaceur, 57 ha) — Aéronautique/composites/fabrication additive (Boeing/MIC/ADN/OCP/UM6P). Phase pré-opérationnelle. Rattachement HIÉRARCHIQUE TI².\n" +
"- MASCIR = Moroccan Foundation for Advanced Science Innovation Research — matériaux avancés, microélectronique, biosciences, caractérisation. Rattachement HIÉRARCHIQUE TI².\n\n" +
"INITIATIVES ACADÉMIQUES (supervision FONCTIONNELLE TI²) :\n" +
"- IGSAC = Institut Gouvernance et Sciences Administratives.\n" +
"- ARC Metallurgy = Africa Research Center on Metals — métaux stratégiques (JV UM6P/Maghreb Steel).\n" +
"- ARC AI = Africa Research Center on Artificial Intelligence (mention seule, non qualifié).\n" +
"- BENCH = Plateforme tests / benchmarking R&D transversale.\n" +
"- AL MOUTMIR = modèle de développement agricole OCP (2018), hébergé par l'UM6P College of Agriculture & Environmental Sciences. Réseau de DÉPLOIEMENT/VALIDATION TERRAIN (plateformes de démonstration en champ) pour innovations AGRONOMIQUES uniquement — PAS un pilote industriel. Bouclage TRL 7→8 mobilisable via TESP sur le SEUL périmètre agri. Détail en B2.\n\n" +
"FILIALES & JV (gouvernance STRATÉGIQUE PARTAGÉE TI²) :\n" +
"- iTX = Innovation & Technology aXelerator — filiale UM6P/OCP, S.A. privée. Héberge TechCell + 7 ARCs sectoriels. Périmètre TRL 3/4 → 6/7. CEO Youssef Assou.\n" +
"- TechCell = Technology Cell, intégrée à iTX. Plateforme prototypage/scale-up transversale + méthodologie TRA.\n" +
"- TECHNOPHOS = JV Prayon Group 50% / UM6P 50%, société bulgare (juin 2013). Localisation : Devnya, BULGARIE (PAS Maroc). ~38 personnes. 7 pilotes mutualisés + équipements analytiques SpectrumLab.\n" +
"- GEP = Green Energy Park (Benguerir + Yamoussoukro Côte d'Ivoire via GEP MCI). 10 pilotes solaire/H2/dessalement/biogaz. Contact : Mohamed Boussetta.\n" +
"- INNOVX = Plateforme entrepreneuriat et incubation UM6P. Récipiendaire de pilotes IART transférés (CaF2, Résine) — frontière aval TRL 7-8 à clarifier.\n" +
"- TTO = Technology Transfer Office — bras valorisation IP de l'UM6P (aval, axe Protect/Develop). Head Hicham Gourgue. 5 services : Tech intelligence & FTO, IP Due Diligence, IP Assessment & Patent drafting, Overseas patent filing strategy, Workshops IP/TT. Chiffres : 96 brevets UM6P déposés, 367 gérés, 60 designs/marques, 6 startups. PAS une plateforme de scale-up — entité valorisation. Acteur clé du métier simulé par ValorIQ.\n" +
"- CLEVERLYTICS = spin-off UM6P d'IA & Data Science (Benguerir), entre AI Lab et société de conseil. CEO Walid Daou. GPU/HPC propres + LLM open-source. Cas d'usage industriels OCP (contrôle procédé acide phosphorique, optimisation énergétique, conveyor tear detection, dragline anti-collision). Voie de valorisation digitale (spin-off), distinct de DICE et de l'e-Pilot ITX.\n\n" +
"COLLEGES & RESEARCH UNITS UM6P (rattachement académique — appui amont TRL 3-5) :\n" +
"- CCSE = College of Chemistry & Sustainability Engineering — COLLÈGE ACADÉMIQUE de chimie. PAS un centre énergétique.\n" +
"- CBS = College of Biological Sciences. GSMI = Geology and Sustainable Mining Institute. MSN = Materials Science and Nanoengineering. ASARI = African Sustainable Agriculture Research Institute (Laâyoune). GTI = Green Tech Institute (H2 vert, capture CO2, biomasse). EMINES = School of Industrial Management.\n\n" +
"GOUVERNANCE & PROGRAMMES :\n" +
"- TI² = Division Transformation, Innovation & Impact — orchestrateur global (incubator & enabler). Chaîne de valeur : Map & Assess → Engineer & Prototype → Protect → Comply → Develop & Market → Advocate (TRL/CRL 3→7). 7 fonctions : Scientific & Market insights · PMO & Innovation Governance · Business Development & Building · Engineering & Tech Development · Regulatory & Compliance · Advocacy · Performance & Impact mgt.\n" +
"- TESP = Technology Engineering & Scale-up Platform — programme transversal scale-up TRL 4→7 (extension Gate Stratégique TRL 7→8). Note PO004/2026 signée Hicham El HABTI le 9 février 2026. Rattachée à TI². Orchestrateur, PAS un labo ni un acteur industriel.\n" +
"- TTO, LaunchX, P-SHIFT (Phosphate Solutions High-Impact Forward Technology, TI²/OCP/SPS).\n\n" +
"ÉCOSYSTÈME OCP : OCP = Office Chérifien des Phosphates (actionnaire UM6P via Fondation OCP, 2009). SPS, SBU, MWB.\n\n" +
"INTERDIT FORMEL :\n" +
"- Ne JAMAIS dire que TECHNOPHOS est au Maroc (Devnya, Bulgarie uniquement).\n" +
"- Ne JAMAIS dire que TECHNOPHOS est filiale 100% UM6P (JV 50/50 Prayon/UM6P).\n" +
"- Ne JAMAIS confondre TechCell (entité produit) et iTX (Xelerator hébergeur).\n" +
"- Ne JAMAIS attribuer un brevet à UM6P/OCP/Boeing sans source vérifiable.\n" +
"- Ne JAMAIS inventer un acronyme hors de cette liste ni une capacité/équipement non documenté.\n" +
"- Si acronyme inconnu → écrire seulement l'acronyme sans le développer.\n" +
"=== FIN GLOSSAIRE ===\n";

  // ───────────────────────────────────────────────────────────────
  // BLOC 2 — Catalogue plateformes par TRL/domaine + pipeline (agents techniques)
  // Plages TRL scopées au strict 4-7 (range réel en commentaire dans le texte).
  // ───────────────────────────────────────────────────────────────
  var B2 = "\n\n=== CATALOGUE PLATEFORMES TESP/UM6P (Mémoire v12) ===\n" +
"Sélectionne UNIQUEMENT des plateformes de cette liste. Ne jamais inventer une capacité non documentée. Les plages TRL ci-dessous sont bornées au périmètre TESP 4-7.\n\n" +
"CATÉGORIE 1 — CHIMIE / PROCÉDÉS / PHOSPHATES :\n" +
"- iTX (TRL 4-7) : levier d'innovation OCP/UM6P. Workflow TRA → Maturity Plan → Process Simulation → Pilot Manufacturing → Process Expertise. 2 BUs (Chemistry + MineX), 7 ARCs sectoriels. Sites Benguerir + Safi, ~25 ha. e-Pilot = méthode itérative (ouvrage Chaouki) : conception papier (bilans M/E) → outils numériques (Aspen, ProSim, HYSYS, CFD, DEM, ACV, CAPEX/OPEX) → ne piloter que l'essentiel. Bénéfices revendiqués : -40% coûts développement, -50% time-to-market, +30% précision prévisions. CEO Youssef Assou.\n" +
"- TechCell (TRL 4-7, intégrée iTX) : prototypage/scale-up transverse + méthodologie TRA (ISO 16290 + DoE TRA Guide). « At the service of ARCs, industrials, researchers and startups for scale-up and technology support ».\n" +
"- IART (TRL 5-7 ; réel 5-8) : 4 ha Jorf Lasfar. PHOSPHOCHIMIE voie SULFURIQUE (upstream filière phosphate). Pilotes H3PO4 (production, purification PPA, décantation, extraction L-L). 3 missions : exploitation pilotes / construction facilities / développement nouveaux pilotes sur-mesure. Contact gouvernance Youness Khouraibchia ; contacts techniques Elmoustapha Az-Echarafe / Ayoub Bourjilate. Réservation min 7 jours via QReserve.\n" +
"- TECHNOPHOS (TRL 4-6 ; réel 2-6) : Devnya, BULGARIE. 7 pilotes mutualisés + équipements analytiques SpectrumLab. Modèle 3 étapes Lab→Pilot×10→Semi-Industrial×100, livrable PDP. DOWNSTREAM voie HCl (EcoPhos). Capable de procédés non-P (chimie générale). ATTENTION : NON-Maroc → overhead transport échantillons +20 à +40% (durée et coût).\n" +
"- CEPH (TRL 4-6) : Expertise Center for Phosphate. Chimie des phosphates de spécialité — pharma-grade, food-grade, BATTERY-GRADE. Validation analytique + caractérisation + support scale-up. Interface chercheurs UM6P ↔ ingénieurs OCP. Portfolio oct. 2025 : 18 ongoing + 10 contractualization. Contact Rim Hajji (PI Hamid Mazouz). Inventaire équipements non documenté (gap).\n\n" +
"CATÉGORIE 2 — MATÉRIAUX / FABRICATION / SCIENCES :\n" +
"- ACME (TRL 4-7) : Nouaceur, 2 ha sur pôle aéronautique 57 ha. Aéro/composites/fabrication additive. Founding members Boeing/MIC/ADN/OCP/UM6P. 3 piliers : Sustainable Advanced Materials + Additive Manufacturing + Product-Process Monitoring. Nommée comme plateforme de scale-up dans l'AAP SPARKS (sels phosphatés), avec TechCell. ⚠ Phase PRÉ-OPÉRATIONNELLE (soft launch ciblé juin 2026) : NE PAS recommander pour production immédiate avant fin 2026. Contact Hicham Cherkaoui.\n" +
"- MASCIR (TRL 4-6) : 3 domaines — matériaux avancés (nano/composites/fonctionnels), microélectronique (conception/fabrication), biosciences/biocapteurs — + plateformes de caractérisation avancée. Centre DMSD (Digitalization & Microelectronics Smart Devices) documenté : design package/PCB (Cadence, Altium, ANSYS, COMSOL, CST), packaging/process dev, reliability/failure analysis (MSL, SAM/SEM, IMC), salles blanches Class 1000/10000 (lignes SMT, reflow 8 zones, pick&place, dicing, wire/flip-chip bonders), capteurs agri/médical/indus. Contacts Ibrahim Lakssir / Nawal Chraibi / Zouhir Sekkat. GAP : inventaire volet matériaux/nano (MEB/MET/AFM/XRD/XPS, BSL) non documenté — ne pas inventer.\n" +
"- ARC Metallurgy (TRL 4-6) : JV UM6P/Maghreb Steel (ARC-MS). Scale-up 2 kg → 400 kg → 250 t / 5 grades. Grades : aciers faiblement/moyennement alliés + fonte (cast-iron). Procédés : steelmaking, additive manufacturing, surface engineering, green steel. Applications auto/aéro, médical, tribologie/corrosion, énergie. Budget 2025 ~34 MMAD/an.\n\n" +
"CATÉGORIE 3 — ÉNERGIE / DIGITAL / SYSTÈMES :\n" +
"- GEP (TRL 4-7 ; réel 2-9) : Green Energy Park (Benguerir + Yamoussoukro CI via GEP MCI). 10 pilotes : solaire PV (outdoor 100-200 kW ; bench 110 modules/mois), hydrogène (électrolyseur alcalin 26 kW, 4 Nm3/h H2), dessalement hybride RO+MEVMD+ED (5-7,5 m3/h), hybride solaire-biomasse REELCOOP ORC (4,5 kW), nexus eau-énergie-agriculture + biogaz (MCI). Seule plateforme TESP multi-pays. Contact Mohamed Boussetta. TRL par pilote et pricing non documentés (gap).\n" +
"- DICE (TRL 4-7) : Digital, IA, IoT industriel, jumeaux numériques, intégration systèmes, scale-up digital MVP→production. Procédure accélérée digital ≤10j possible (gate digital -30 à -50% vs hardware). Organisation : 7 labs — Data-Lab (8), Code-Lab (11), Digital ID Lab (27), Tech-Lab (11), Factory-Lab (3), Spectrum-Lab (2), Fab-Lab (7) + Advanced Engineering Office (12) + Microwaves Energy & Sensing (3). Projets à fort impact : Digital ID (Min. Intérieur), Trade.ma, TelmidTice, jumeaux numériques Jorf, camion autonome. Contact Rafiq Alami. Articulation avec ARC Digital + e-Pilot ITX à clarifier (redondance potentielle).\n" +
"- ARC Digital (TRL 4-7) : solutions digitales, data engineering, intégration systèmes, automatisation. Contact à confirmer. Redondance potentielle avec DICE.\n" +
"- GAPP (Green Ammonia Pilot Plant) — pilote ammoniac vert sur site industriel OCP Jorf Lasfar (10 ha), projet Green H2A. Accord UM6P/OCP/IRESEN (25 nov. 2021). Capacité 4 MTPD via 2 MW électrolyse alcaline + 2 MW PEM → Haber-Bosch. Composants : émulateur EnR, déminéralisation eau, électrolyse, ASU, stockage H2/N2, unité ammoniac, purification, stockage ammoniac liquide. EPC Proton Ventures. En construction/commissioning. Aligné MWB Green Ammonia OCP — exemple de bouclage TRL industriel.\n\n" +
"CATÉGORIE 4 — MINES / GÉOSCIENCES / PARTENAIRES EXTERNES :\n" +
"- ARC Mining (TRL 4-6) : ingénierie minière, valorisation ressources, technologies extractives. Contact à confirmer.\n" +
"- ARC Geo (TRL 4-6) : géosciences, caractérisation/modélisation sous-sol, évaluation ressources. Contact à confirmer.\n" +
"- OCP / Al Moutmir (validation TRL 6→8 — DOMAINE AGRI UNIQUEMENT) : modèle de développement agricole OCP (2018), hébergé par l'UM6P College of Agriculture & Environmental Sciences. NON un pilote industriel : RÉSEAU DE DÉPLOIEMENT & VALIDATION EN CHAMP (« from the lab to the farm »). Mécanisme = plateformes de démonstration chez l'agriculteur, sous référentiel ICP (Integrated Crop Program) : 29 300+ plateformes, 120+ agronomes sur 43 provinces, 40 000+ agriculteurs en direct + 540 000+ via digital. 7 axes : santé des sols, gestion de l'eau, nutrition des cultures, renforcement des capacités, climat, productions animales, mécanisation durable. RÔLE TESP : partenaire de BOUCLAGE TRL 7→8 (Phase 4B / Gate Stratégique) pour les SEULS projets agronomiques (fertilisation/formules sur-mesure, semis direct, gestion sols/eau, mécanisation agricole, semences, productions animales) — JAMAIS pour chimie/matériaux/énergie. PI : 9 brevets de mécanisation agricole (co-conçue avec agriculteurs — pertinent ValorIQ). Outils/atouts mobilisables : 7 labos mobiles d'analyse sol (167 400+ analyses, 565 018 ha cartographiés), Smart Blender (formules sur-mesure en champ, 50 unités/47 provinces), @tmar (app extension, 540 000+ users), T@swiq (marketplace), Agripedia (base de connaissances). Impact validé : +25% rendement / -25% coûts (cultures sucrières), 100% fertilisants sur-mesure depuis 2022, 32 700+ ha semis direct (+30% rdt). Partenaire carbone : Tourba/INNOV'X (10 000 ha). Activation projet par projet via coordination TESP (accord OCP-UM6P). Contact Jamila Adani (almoutmir@ocpgroup.ma).\n\n" +
"APPUI AMONT (académique, TRL 3-5, hors périmètre exécution mais mobilisable en amont) :\n" +
"- CCSE, CBS, GSMI, MSN, ASARI, GTI — recherche académique amont.\n" +
"- CoreLab (Jorf Lasfar) : centre analytique transversal (LIBS, presse à comprimés Infitek). Mobilisable tous domaines.\n\n" +
"PARTENAIRES EXTERNES TYPIQUES (overhead +20% à +40%) :\n" +
"- Industriels : Lafarge/Holcim Maroc, Yara/Syngenta, Sanofi/MSD, Boeing/Safran.\n" +
"- RTO : Fraunhofer (DE), IRT-SystemX (FR), IMEC (BE), IRESEN (MA). NB : SATT = structures de transfert, PAS des RTO.\n\n" +
"PIPELINE TESP — 7 PHASES + 5 GATES :\n" +
"- Phase 0 Origination (TRL 3) : éligibilité informelle\n" +
"- Phase 1 Foundation (TRL 3→4) : Gate 1 Maturité — Comité Opérationnel\n" +
"- Phase 2 Structuring (TRL 4 consol.) : sans gate, ≤8 sem. (≤4 sem. digital)\n" +
"- Phase 3A Validation (TRL 4→5) : Gate 2 — Op. → Strat. si seuil\n" +
"- Phase 3B Engagement (TRL 5→6) : Gate 3 — Op. → Strat. obligatoire si seuil\n" +
"- Phase 4A Robustness (TRL 6→7) : Gate 4 — Comité Opérationnel\n" +
"- Phase 4B Qualification (TRL 7→8) : Gate Stratégique obligatoire\n" +
"DÉCISIONS GATE : GO | HOLD (≤60j ; ≤30j digital) | NO-GO (archivage 15j) | REDIRECT (30j).\n\n" +
"13 RESEARCH INITIATIVES UM6P : 1.Agronomy & Nutrition · 2.Biotech & Health · 3.Smart Urbanization · 4.Water · 5.Green H2 & Ammonia · 6.Digital Sciences & Tech · 7.Soils & Fertilizers · 8.Energy Harvesting & Storage · 9.PG & Secondary Materials · 10.Extraction & Purification · 11.Sustainable Metallurgy & Corrosion · 12.Geology & Sustainable Mining · 13.Phosphorus & Derivatives.\n" +
"=== FIN CATALOGUE PLATEFORMES ===\n";

  // ───────────────────────────────────────────────────────────────
  // BLOC 3 — Contexte stratégique OCP/UM6P + valorisation (agents décisionnels)
  // ───────────────────────────────────────────────────────────────
  var B3 = "\n\n=== CONTEXTE STRATÉGIQUE UM6P / OCP (Mémoire v12) ===\n" +
"Utilise ce contexte pour calibrer la triple lecture stratégique (notamment volet OCP captif).\n\n" +
"VISION UM6P 2040 (BHAG) : devenir l'université africaine de référence parmi les top tech mondiaux, breakthroughs en AI, santé, énergie verte, agriculture durable. Maroc = innovation superpower africaine.\n\n" +
"DUAL TRANSFORMATION OCP (A → C → B) : Industrial Excellence vers Industrial Excellence ET Science/Innovation/Digital.\n\n" +
"8 PRIORITÉS STRATÉGIQUES OCP : 1.People & Planet Positivity 2.Talent Full Potential 3.Rock Equity 4.Customization 5.Being Digital 6.Cost Leadership 7.Specialty Diversification 8.Green Nitrogen + transverses Innovation Engine, Ecosystem, Reputation.\n\n" +
"MWBs (Must-Win Battles) CHIFFRÉS — clé pour 'marché captif OCP' :\n" +
"- Carbon neutrality scopes 1+2 par 2030 ; 3 scopes par 2040\n" +
"- Phosphogypsum : 21 Mt stockés + 5 Mt valorisés + 3 Mt/y sulfur par 2027 ; 100% par 2030\n" +
"- Demetallization (Cd, As, Cr) : 1 Mt/y fertilizers par 2025 ; full par 2027\n" +
"- Phosphate Salts, LFP, P4 (Specialty Diversification)\n" +
"- Uranium 426 klbs U3O8 + Fluorine 20 kt AHF par 2027 ; 100% par 2030\n" +
"- Rare Earths : TRL3→TRL6 fin 2025 ; industrial scale-up 2027\n" +
"- Green Ammonia : 100 kT/y par 2026 → 1 MT par 2027 → 3 MT par 2032 → 10 MT par 2035\n" +
"- Hydrogen : 1.5 USD/kg in situ par 2035\n" +
"- Customized Fertilization 2027 : 4 Mt Afrique + 4.7 Mt Brésil + 1-3 Mt US + 4 Mt Inde + 2 Mt Europe + 3.6 Mt LatAm\n" +
"- Rock Equity : 14 Mt rock exports par 2027 ; 4 Mt rock interne par 2027\n" +
"- Direct application + Biofertilizers : 2 Mt par 2027 ; 7.5 Mt par 2030\n" +
"- Green Nitrogen : 3 MT green fertilizers par 2027\n\n" +
"USAGE POUR VERDICT STRATÉGIQUE OCP :\n" +
"- Projet aligné MWB chiffré → GO STRATÉGIQUE OCP très probable, marché captif identifié\n" +
"- Projet hors MWBs mais aligné 8 priorités → GO CONDITIONNEL\n" +
"- Projet hors stratégie OCP → évaluer uniquement MARCHÉ OUVERT\n\n" +
"7 VOIES DE VALORISATION (TRL 7+) : 1.Licensing exclusif (royalties 3-7%) 2.Spin-off (Series A) 3.Transfert direct 4.JV avec OCP/OCP Group 5.JV avec industriel tiers 6.Service R&D contractuel 7.Open access stratégique.\n\n" +
"CYCLES B2B BENCHMARK (anti-optimisme time-to-revenue) :\n" +
"- Cimentier 18-24 mois | Pharma 5-8 ans (FDA/EMA 36-60 mois) | Aéronautique 36-60 mois | Agro/Fertilisants 12-24 mois | Digital B2B SaaS 6-12 mois | Énergie/H2 24-36 mois.\n\n" +
"ÉCOSYSTÈME UM6P : Benguerir (campus principal) | Rabat-Salé (AI Research, Policy Center) | Laâyoune (ASARI) | Casablanca-Nouaceur (ACME 57 ha) | Khouribga/Safi/Youssoufia | Mazagan/El Jadida (IART, Jorf Lasfar) | Yamoussoukro CI (GEP MCI) | Hubs Paris, New York.\n\n" +
"POSITIONNEMENT : université privée non lucrative, créée 2013, inaugurée 2017. Modèle land-grant. Origine Fondation OCP (2009).\n\n" +
"PRINCIPE TRIPLE LECTURE :\n" +
"- STRATÉGIQUE OCP → alignement MWBs/8 priorités/Dual Transformation, marché captif probable\n" +
"- ACADÉMIQUE → excellence scientifique UM6P (publis A, doctorants, brevets, 13 Research Initiatives)\n" +
"- MARCHÉ OUVERT → viabilité hors captif, cost-to-serve, time-to-revenue, risque rattrapage\n" +
"=== FIN CONTEXTE STRATÉGIQUE ===\n";

  // ───────────────────────────────────────────────────────────────
  // BLOC 4 — Inventaire équipements détaillés (SYS_MAT, SYS_TRL_MATURATION)
  // Matching procédé ↔ équipement réel. NE PAS inventer d'équipement non documenté.
  // ───────────────────────────────────────────────────────────────
  var B4 = "\n\n=== INVENTAIRE ÉQUIPEMENTS DÉTAILLÉS PLATEFORMES UM6P (Mémoire v12) ===\n" +
"À utiliser pour MATCHING PROCÉDÉ ↔ ÉQUIPEMENT lors de la recommandation plateforme.\n" +
"Règle : ne pas se contenter de 'IART parce que phosphate' — citer l'équipement spécifique qui matche le procédé. Si l'équipement n'est pas documenté ci-dessous, le DIRE (gap), ne pas inventer.\n\n" +
"━━━ TECHNOPHOS (Devnya, Bulgarie — JV Prayon 50% / UM6P 50%) ━━━\n" +
"Modèle 3 étapes : LABORATORY (batch, 2-4 sem.) → PILOT (continu, ×10, 4-6 sem.) → SEMI-INDUSTRIAL (continu, ×100, 11-12 sem.). Livrable final = PDP (Process Design Package). DOWNSTREAM voie HCl. Portée P ET non-P.\n" +
"7 ÉQUIPEMENTS PILOTES MUTUALISÉS via QReserve :\n" +
"1. HCl Pilot Ecophos (modules 1A, 1B, CCP, Module 4) — digestion phosphate par HCl dilué jusqu'à 2 kg/h roche, défluorination, précipitation DCP, filtration, purification CaCl2, régénération HCl.\n" +
"2. Phosphoric Acid Pilot Plant (Module 3 Ecophos) — digestion DCP/phosphate par H2SO4 jusqu'à 3 kg/h. Production H3PO4 25-28% P2O5 → 50% après concentration. Gypse DH ou HH.\n" +
"3. Pilot Membrane Phosphoric acid (Elmatec) — UF/NF, débit jusqu'à 15 L/h. Purification, réduction TDS.\n" +
"4. Semi-industrial Membranes 'PUMA' (Elmatec) — UF/NF, débit jusqu'à 1 m3/h. Purification streams industriels.\n" +
"5. Ion Exchange Pilot (IEx) — purification/polishing H3PO4 jusqu'à 5 L/h, retrait métaux, séparation ionique sélective.\n" +
"6-7. (autres pilotes via QReserve, à préciser au cas par cas).\n" +
"ÉQUIPEMENTS D'ANALYSE & CARACTÉRISATION (Technophos / SpectrumLab, via QReserve) :\n" +
"- LIBS Spectroscopie Laser Elemission SLURRY (32 unités).\n" +
"- Presse à comprimés Infitek TP-H40S (15 unités).\n" +
"- Pilote décantation / coagulation-floculation.\n" +
"- Réacteurs fermés agités calorifugés (150 L, jusqu'à 200°C, 7 bar) + réacteurs double enveloppe.\n" +
"DIFFÉRENCIATION : Technophos conçoit ses propres équipements custom (filtration, on-line analysis) → prototypage équipement sur mesure.\n\n" +
"━━━ IART (Jorf Lasfar, Maroc — 4 ha halls semi-industriels) ━━━\n" +
"PHOSPHOCHIMIE voie SULFURIQUE (upstream filière phosphate). Réservation min 7 jours via QReserve.\n" +
"4 PILOTES PRINCIPAUX documentés (+ sous-équipements) :\n" +
"1. Pilote production acide phosphorique — cuve attaque R03 (48,5 L UB6, 5 agitateurs) + section filtration. Attaque phosphate par H2SO4.\n" +
"2. Pilote décanteur centrifuge — séparation solide/liquide H3PO4, bol cylindro-conique.\n" +
"3. Pilote PPA (purification acide phosphorique) — réception acide brut ~28% P2O5, pompe 20 m3/h à 2 bar, cuve tampon 16 m3 en 316L, réacteur tubulaire, désaturation, décantation (7 sections).\n" +
"4. Pilote extraction liquide-liquide — 49 sections : prétraitement, colonnes charbon actif, décanteurs. Tank SVR ciel ouvert (Ø1,4 m × H1,6 m, V utile 2,3 m3), agité, chauffé.\n" +
"STATUTS DES 7 PILOTES REVENDIQUÉS : 3 OPÉRATIONNELS (PPA, Phosphorique, Décantation Centrifuge) · 2 TRANSFÉRÉS Innov'X, gouvernance à clarifier (CaF2 + Résine) · 2 CAPEX DORMANT, plan de réparation prêt, budget en attente (Solvant Pignat/Prayon + DCP).\n" +
"MISSIONS IART : (1) Pilot plants management (2) Construction facilities (3) Développement nouveaux pilotes sur-mesure.\n" +
"CONTACTS : Youness Khouraibchia (gouvernance TESP) ; Elmoustapha Az-Echarafe / Ayoub Bourjilate (technique pilotes).\n\n" +
"━━━ GEP (Green Energy Park — Benguerir + Yamoussoukro CI) ━━━\n" +
"10 pilotes énergies renouvelables. Seule plateforme TESP multi-pays. GEP Services : +160 MW developed, +220 MW O&M.\n" +
"SITE BENGUERIR (6 pilotes) :\n" +
"1. Outdoor PV Plant Test & Monitoring — 100-200 kW. Modules thin film/mono/poly/bifacial, station météo GHI/DNI, SCADA, caméra IR, test I-V.\n" +
"2. PV Module Performance & Reliability Bench — 110 modules/mois. Solar simulator, mechanical load, électroluminescence. Tests IEC 61215 / 61730.\n" +
"3. Solar Streetlight & Pumping Didactic Benches — 1-12 kW (formation/prototypage).\n" +
"4. Upolite alkaline electrolyser — entrée 26 kW, H2 4 Nm3/h, 2 bar, 60°C + unité purification gaz.\n" +
"5. Hybrid RO-MEVMD-ED solar desalination — eau traitée 5 m3/h (RO 7,5 m3/h, MD ~0,6 m3/h). 3 technos en cascade, alimentation PV + solaire thermique. Zéro-rejet liquide (ZLD).\n" +
"6. REELCOOP prototype — hybride solaire (CPC) / biomasse + ORC, 4,5 kW.\n" +
"SITE YAMOUSSOUKRO CI — GEP MCI (4 pilotes) :\n" +
"7. PV Demonstration Plant tropical — 0-50 kW. 8. Solar Agricultural Pumping + Greenhouse — 0-25 kW, 20 kWh batterie. 9. Agricultural Waste Biogas Digester — échelle pilote. 10. Solar Training & Hybrid Systems Platform — 1-2 kW.\n" +
"GAPS : TRL par pilote non documenté · pricing/accès non documentés · statut juridique GEP MCI à clarifier. Contact Mohamed Boussetta.\n\n" +
"━━━ ACME (Nouaceur, 2 ha sur pôle 57 ha) ━━━\n" +
"⚠ STATUT : Phase PRÉ-OPÉRATIONNELLE. Soft launch ciblé juin 2026. Phase 1 2026-2027 / Phase 2 2028-2029 / Phase 3 2030-2031.\n" +
"3 PILIERS (Integrated Manufacturing Technology Ecosystem) :\n" +
"1. Sustainable Advanced Materials : Out-of-Autoclave Composites | Functional Additives & Next-Gen Polymers | Circular Design & Lifecycle Engineering.\n" +
"2. Additive Manufacturing : Large-Format Polymer 3D Printing | Binder Jetting metal | Wire-Arc Additive & CNC Finishing.\n" +
"3. Product-Process Monitoring.\n" +
"CAPABILITIES / LABS (présentation Cherkaoui oct. 2025) : Office Studio | Design Studio | Prototype Studio | Assembly Studio | Large Scale Additive Manufacturing & Tooling. 4 LABS :\n" +
"- High-Rate Production Cell : enveloppe ~100×100×100 mm. Injection moulding métal/céramique, binder jetting, CNC. Production petites/moyennes séries.\n" +
"- Post-Processing Lab : heat treatment / sintering, finition (de-burring, grit-blast, vibratory finish, wash).\n" +
"- Metrology Lab : inspection visuelle/tactile, mesure haute précision, scanning pour reverse engineering.\n" +
"- Test Lab : NDT (détection de défauts), essais mécaniques, métallographie, failure mode investigation.\n" +
"⚠ TOUS pré-opérationnels (soft launch ciblé juin 2026) — citer la capability mais ALERTER l'indisponibilité avant fin 2026.\n" +
"Nommée plateforme de scale-up dans l'AAP SPARKS (sels phosphatés). ⚠ NE PAS recommander pour production immédiate avant fin 2026 ; possibilité de pré-engagement founding member. Contact Hicham Cherkaoui.\n\n" +
"━━━ CEPH (TRL 4-6 — Expertise Center for Phosphate) ━━━\n" +
"Phosphates de spécialité : pharma-grade, food-grade, BATTERY-GRADE. Validation analytique + caractérisation + support scale-up.\n" +
"Pipeline CEPH : SPS → Define & analyse → UM6P Pole Science → Scientific & Academic Program → Align industrial context → TechCell/IART/Technophos (validation pilote) → Provide Solutions.\n" +
"PORTFOLIO oct. 2025 : Rock 10+5 | Phosphoric & sulfuric acid 2+2 | Fertilizers 6+3 | TOTAL 18 ongoing + 10 contractualization.\n" +
"PROJETS PHARES : Demetalization, Phospholab 2, Hydroxyapatite EcoPhos, SuperRock, Decadmiation, Sulfur recovery from PG, MAP'S optimization.\n" +
"GAP : inventaire équipements non documenté. Contact Rim Hajji (PI Hamid Mazouz).\n\n" +
"━━━ MASCIR (TRL 4-6) ━━━\n" +
"3 domaines : matériaux avancés (nano/composites/fonctionnels) · microélectronique (conception/fabrication, centre DMSD) · biosciences/biocapteurs. + plateformes de caractérisation avancée.\n" +
"GAP : inventaire plateformes scientifiques (MEB/MET/AFM/XRD/XPS, salle blanche, BSL) non documenté — ne pas inventer. Contacts Ibrahim Lakssir / Nawal Chraibi / Zouhir Sekkat.\n\n" +
"━━━ ARC METALLURGY (TRL 4-6 — JV UM6P/Maghreb Steel) ━━━\n" +
"Scale-up : 2 kg → 400 kg → 250 t / 5 grades. Applications auto, aéro, médical, énergie. Budget 2025 ~34 MMAD/an.\n\n" +
"━━━ DICE (TRL 4-7 — Digital) ━━━\n" +
"Digital, IA/IoT industriel, jumeaux numériques, intégration systèmes, scale-up digital MVP→production. Gate digital accéléré.\n" +
"GAP : stack/infra (GPU, modèles), cas d'usage industriels et articulation avec ARC Digital + e-Pilot ITX non documentés. Contact Rafiq Alami.\n\n" +
"━━━ TECHCELL / iTX ━━━\n" +
"Service d'engineering scale-up de iTX + TRA. e-Pilot (Aspen/ProSim/HYSYS/CFD/DEM/ACV) pour réduire CAPEX et dérisquer avant pilote physique.\n\n" +
"=== INSTRUCTIONS DE MATCHING (OBLIGATOIRE pour SYS_MAT et SYS_TRL_MATURATION) ===\n" +
"1. IDENTIFIER le procédé/technologie spécifique du projet.\n" +
"2. CITER l'équipement spécifique qui matche (ex: 'Pilote PPA cuve 16 m3 316L', 'Binder Jetting ACME'). Si non documenté → le DIRE, ne pas inventer.\n" +
"3. JUSTIFIER avec capacité chiffrée (kg/h, kW, m3) si disponible.\n" +
"4. VÉRIFIER la cohérence TRL projet ↔ plage équipement (toutes bornées 4-7).\n" +
"5. SIGNALER si statut équipement problématique (ex: 'Pilote CaF2 transféré Innov'X, gouvernance à clarifier').\n" +
"6. AJOUTER l'overhead Bulgarie pour Technophos (+20 à +40%) explicitement.\n" +
"7. ALERTER la pré-opérationnalité ACME pour projets < fin 2026.\n" +
"=== FIN INVENTAIRE ÉQUIPEMENTS ===\n";

  // ───────────────────────────────────────────────────────────────
  // BLOC 5 — Portefeuille solutions MATÉRIAUX DE CONSTRUCTION + centres associés
  // Source : Tableau TRL Building materials v7 (26 solutions). Référentiel de
  // calibration TRL annoncé vs consolidé (anti-TRL-washing) + matching solution↔centre.
  // Consommé par SYS_MAT (TESP) et SYS_TRL_MATURATION (ValorIQ) via technique_equip().
  // ───────────────────────────────────────────────────────────────
  var B5 = "\n\n=== PORTEFEUILLE SOLUTIONS MATÉRIAUX DE CONSTRUCTION UM6P (Mémoire v13) ===\n" +
"Usage : (1) MATCHING solution↔centre pour projets matériaux/construction ; (2) RÉFÉRENTIEL de calibration TRL — comparer le TRL annoncé au TRL consolidé. Ne jamais retenir le TRL annoncé sans justification. Citer la solution spécifique. Si non documentée → le DIRE, ne pas inventer.\n\n" +
"CENTRES MATÉRIAUX (portent des solutions concrètes TRL 4-7, au-delà de l'appui amont B2) :\n" +
"- GSMI = Geology and Sustainable Mining Institute — valorisation stériles miniers Benguerir (granulats/sables/bétons/briques/enrochements/ballast).\n" +
"- CCSE = College of Chemistry & Sustainability Engineering — isolants, biosourcés, composites (porteur clé : H. Mastouri).\n" +
"- SMR/MSN = Materials Science & Nanoengineering — géopolymères, eco-bricks, éco-ciments BCSA, céramiques.\n" +
"- MASCIR — volet protection métallique : anticorrosion Zn-Al-X, béton PCM, nano-peintures TiO2/ZnO/graphène.\n" +
"- IST&I — filière phosphogypse (PG) et additifs biosourcés ciment (souvent en partenariat CIMAT/OCP/LPEE).\n\n" +
"RÈGLE TRL CONSOLIDÉ : majorité du portefeuille en TRL 3-6. Format ci-dessous = [Solution | Centre | TRL annoncé→consolidé | gate suivant | risque clé | PI].\n\n" +
"━━━ GSMI — STÉRILES MINIERS / INFRASTRUCTURE ━━━\n" +
"- Granulats alternatifs (béton) | GSMI | 5-6→5 | dalle pilote + inhibiteurs ASR | risque ASR silex (structurel) | publié (El Machi 2021).\n" +
"- Sables recyclés RS/FS/PFS/DLS | GSMI | 5-6→5 | élément structurel pilote + durabilité | ASR confirmé (essai autoclave) | publié (Beniddar 2024).\n" +
"- Bétons HPC stériles phosphate | GSMI | 5→5-6 | élément structurel pilote | ASR silex (structurel) | publié (El Berdai 2024a).\n" +
"- Enrochements / roches stériles Benguerir | GSMI | 3-4→3-4 | pilote enrochement + certif NM | réglementation/certification granulats | publié (Chlahbi 2023).\n" +
"- Ballast ferroviaire silex stériles | GSMI | 3-4→3-4 | section voie test + homologation ONCF | homologation ferroviaire | publié (Inabi 2025).\n" +
"- Briques stériles CEB | GSMI | 6-7→5-6 | four pilote industriel + durabilité LT | procédé + durabilité LT | publié (Mouih 2023). NOTABLE : la plus mature côté stériles.\n" +
"- Ciment OPC intercalaires CRL | GSMI | 4-5→4-5 | essai four pilote | procédé | know-how interne (discussion LH).\n\n" +
"━━━ CCSE — ISOLANTS / BIOSOURCÉS / COMPOSITES (H. Mastouri) ━━━\n" +
"- Mortier chanvre-gypse | CCSE | 6→5 | bâtiment pilote + hygrométrie | humidité/termites | pas de norme NM biosourcé (blocage régl.).\n" +
"- Composite UP + déchets céramique | CCSE | 3-4→3-4 | prototype panneau + UV | vieillissement | publié (J. Compos. Sci. 2026).\n" +
"- Plâtre/polystyrène recyclé | CCSE | 4-5→4-5 | test feu + vieillissement | feu/réglementation | publié (Springer 2025).\n" +
"- Plâtre/bois (wood shavings) | CCSE | 5-6→5 | mur pilote + suivi thermique | humidité | publié (J. Compos. Sci. 2025).\n" +
"- Panels ENSUS | CCSE | 5-6→5 | façade pilote + vent/humidité | mécanique/vent | pas de publication identifiée.\n\n" +
"━━━ SMR/MSN — GÉOPOLYMÈRES / ECO-BRICKS / ÉCO-CIMENTS ━━━\n" +
"- Céramiques marocaines modernisées | SMR/MSN/CCSE | 3-4→3-4 | série courte + abrasion/choc | marché (niche) | publié.\n" +
"- Ciment BCSA | SMR/MSN/CCSE | 4-5→4-5 | four pilote + centrale béton | procédé | thèse en cours — PI à protéger (Borja).\n" +
"- Eco-Bricks (terre + déchets olive) | SMR/MSN/CCSE | 4-5→4 | mur test extérieur + humidité | technique | publié.\n" +
"- Géopolymères déchets phosphatiers | SMR/MSN/CCSE | 3-4→4 | pilote 1-2 t + durabilité | normalisation (pas de norme géopolymère) | thèse en cours — PI à protéger (Sbi).\n\n" +
"━━━ STARTUP / VALORISATION ━━━\n" +
"- Pavés amortissants PNUVAL | Startup (El Kacem Qaiss) | 7→7 | extension multi-site + certif | faible | know-how startup (procédé valo pneus). NOTABLE : SEULE solution TRL 7 — déploiement réel 1600-1700 m².\n\n" +
"━━━ MASCIR — PROTECTION MÉTALLIQUE / NANO-REVÊTEMENTS ━━━\n" +
"- Revêtements anticorrosion Zn-Al-X | MASCIR | 4→4 | optim procédé + dépôt brevet | corrosion env. agressifs (validation terrain) | brevet à déposer.\n" +
"- Béton PCM (changement de phase) | MASCIR | 4→4 | validation modules pilotes conditions réelles | durabilité microcapsules | brevet à anticiper.\n" +
"- Peintures anticorrosion nano (TiO2/ZnO/graphène) | MASCIR | 4-5→4-5 | acier structurel réel + UV/thermique | stabilité nanoparticules | formulation à protéger.\n\n" +
"━━━ IST&I — PHOSPHOGYPSE (PG) / ADDITIFS BIOSOURCÉS ━━━\n" +
"⚠ VERROU FILIÈRE PG : métaux lourds + radioéléments = verrou réglementaire commun, non levé. Conditionne TOUTE valorisation construction du PG.\n" +
"- Phosphogypse retardateur de prise (subst. gypse) | IST&I/CIMAT | 4-5→4-5 | validation pré-industrielle four pilote CIMAT | radioéléments/métaux lourds | projet OCP-CIMAT, PI à définir.\n" +
"- PGBioP2+ plaques plâtre biosourcées (PG) | IST&I | 3-4→3-4 | prototype + essais thermo-acoustiques | décontamination préalable obligatoire | PI Mouatassim Charai.\n" +
"- Eco-TerraP briques résidus phosphatiers | IST&I | 3-4→3-4 | prototype + lixiviation métaux lourds | métaux lourds/radioéléments | PI Moad Nadi.\n" +
"- Stabilisation métaux lourds dans PG | IST&I/OCP-CETEMCO | 3-4→3-4 | publication résultats + protocole validé | verrou principal filière PG | accord OCP/CETEMCO, PI à clarifier.\n" +
"- Valorisation PG briques/agglos | OCP/LPEE | 4-5→4-5 | brique PG pilote + conformité éléments traces | métaux lourds/radioéléments | projet OCP Corp. Sustainability.\n" +
"- Additifs ciment biosourcés (biomasse) | IST&I | 4-5→4-5 | additif en cimenterie pilote CIMAT | variabilité biomasse | procédé à protéger (accord CIMAT/LH).\n\n" +
"RÉFÉRENTIEL ÉCHELLES D'EXPÉRIMENTATION ↔ TRL (grille ITX e-Pilot, El Khouaki) — pour calibrer la lecture TRL :\n" +
"- Échelle fondamentale / laboratoire (TRL 1-3) : faible quantité, tubes/réacteurs quelques litres. Ex : synthèse au gramme.\n" +
"- Échelle physique / maquette : isole un phénomène (ex : hydrodynamique d'un agitateur) sans la chimie.\n" +
"- Échelle intermédiaire / pilote (TRL 4-5) : unité miniaturisée complète, conditions proches du réel. Ex : réacteur 50 L (cinétique + transfert thermique).\n" +
"- Échelle pré-industrielle / démonstration (TRL 6-7) : ~1/10e de l'unité finale, produit pour tests clients. Ex : unité 500 L produisant 100 kg/jour pour validation marché.\n" +
"=== FIN PORTEFEUILLE MATÉRIAUX ===\n";

  // ───────────────────────────────────────────────────────────────
  // Exposition globale — API préservée + alias equipements() ajouté
  // ───────────────────────────────────────────────────────────────
  window.MEM_UM6P = {
    version: 'v14',
    date: '2026-06-02',
    B1: B1, B2: B2, B3: B3, B4: B4, B5: B5,
    // Helpers de composition (API v11/v12 PRÉSERVÉE — noms inchangés)
    compact: function () { return B1; },                          // Glossaire seul
    technique: function () { return B1 + B2; },                   // Glossaire + plateformes
    technique_equip: function () { return B1 + B2 + B4 + B5; },   // + équipements + portefeuille matériaux (consommé par SYS_MAT, SYS_TRL_MATURATION)
    equipements: function () { return B1 + B2 + B4 + B5; },       // ALIAS de technique_equip
    materiaux: function () { return B1 + B5; },                   // NOUVEAU v13 : glossaire + portefeuille matériaux seul
    strategique: function () { return B1 + B3; },                 // Glossaire + stratégie
    complet: function () { return B1 + B2 + B3; },                // Tout sauf B4/B5
    complet_equip: function () { return B1 + B2 + B3 + B4 + B5; } // Tout
  };

  if (typeof console !== 'undefined' && console.log) {
    console.log('[MEM_UM6P] Mémoire institutionnelle UM6P v14 chargée. B1=' + B1.length + 'c, B2=' + B2.length + 'c, B3=' + B3.length + 'c, B4=' + B4.length + 'c, B5=' + B5.length + 'c.');
  }
})();
