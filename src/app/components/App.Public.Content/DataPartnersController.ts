/**
 * Created by mgilligan on 9/8/2015.
 */
/// <reference path="../../tsd.d.ts" />

// ReSharper disable once WrongExpressionStatement
"use strict";

class DataPartnersController {
    public static controllerName = "DataPartnersController";
    public static controllerAsName = "dataPartnersCtrl";


    public static $inject = ["$log"];

    public DataPartners:any[] = [

        {
            "partner": "Propstack",
            "country": "India",
            "href": "www.propstack.com/",
            "img_src": "propstack.jpg",
            "text": "Propstack is the leading commercial real estate information provider for India. Led by a team of real estate, research and analytics experts, Propstack conducts expansive, ongoing research to produce and maintain the largest and most comprehensive database of commercial real estate information. Propstack&rsquo;s suite of online services enables its clients to analyze, interpret and gain unmatched insight on commercial property values, market conditions and current availabilities."
        },
        {
            "partner": "Nomisma",
            "country": "Italy",
            "href": "www.nomisma.it/index.php/en/",
            "img_src": "Nomisma.png",
            "text": "Nomisma is a prominent Italian economic research and consulting company for businesses, associations and government agencies. Its Real Estate Observatory has been collecting and collating property and finance data for more than 25 years, and is a focal point for operators in the sector. Activities include regular reporting on the main Italian RE markets, public and private strategy advisory, project feasibility studies and assistance in the valuation, monitoring and risk assessment of real estate investments."
        },
        {
            "partner": "IMMOunited",
            "country": "Austria",
            "href": "www.immounited.com/Rebrand/IMMOunited/Default.aspx",
            "img_src": "IMMOunited.png",
            "text": " Founded in October 2007, IMMOunited GmbH is Austria&rsquo;s leading real estate consulter which offers customers decisive and competitive advantages by providing online access to timely and comprehensive information about property transactions. IMMOunited sets the stage for encouraging the transparency of the real estate market in Austria."
        },
        {
            "partner": "Property Web",
            "country": "Spain",
            "href": "propertyweb.eu",
            "img_src": "PropertyWeb.png",
            "text": "Property Web (Spain) is considered the only independent source of local market knowledge on the Spanish property market, providing a complete daily information package together with 10 different data bases incorporating tools such as, deals analysis, property news, market studies, active national/international investors, market requirements, info on a particular activo/street or company, market &ldquo;gossip&rdquo; and property offers."
        },
        {
            "partner": "China Index Academy",
            "country": "China",
            "href": "ir.soufun.com/phoenix.zhtml?c=233487&p=irol-irhome",
            "img_src": "cia.jpg",
            "text": "China Index Academy (CIA) is the largest independent property research organization  with more than 15 offices throughout China.  Since its set up in 1999, CIA has been providing comprehensive and accurate property/land data in a timely manner and generating key market insights for its valued customers. Currently, CIA has experienced research teams to cover real-time transaction data in 300 cities across China."
        },
        {
            "partner": "Property Data",
            "country": "UK",
            "href": "www.propertydata.com",
            "img_src": "property_data.gif",
            "text": "Property Data is a UK-based research firm with whom Real Capital Analytics has an exclusive partnership. Since 1991, Property Data has become the market leader in capturing UK commercial investment transactions and their data is regularly quoted by leading media outlets like Bloomberg, Reuters and the Financial Times."
        },
        {
            "partner": "Nikkei Business Publications",
            "country": "Japan",
            "href": "realestate.nikkeibp.co.jp",
            "img_src": "nikkei.gif",
            "text": "Founded in 1969, Nikkei Business Publications is the publisher of the Nikkei Real Estate Market Report and is the leading provider of business information and commercial property transaction data for Japan. Part of the Nikkei Group of Companies, Nikkei Business Publications is based in Tokyo and has 950 employees."
        },
        {
            "partner": "THOMAS DAILY",
            "country": "Germany",
            "href": "www.thomas-daily.de/",
            "img_src": "thomas_daily.gif",
            "text": "THOMAS DAILY offers the largest database of property information in Germany. TD Premium interlinks news, transactions, project developments and market data, thus providing a comprehensive research archive. Subscribers directly access an enormous data stock covering all German cities and gain access to exclusive real estate market knowledge."
        },
        {
            "partner": "BulwienGesa AG",
            "country": "Germany",
            "href": "www.bulwiengesa.de/",
            "img_src": "bulwiengesa.gif",
            "text": "BulwienGesa offers quality and objective advice to major property investors in Germany and has developed a database of market information that enables its clients to effectively compare investment opportunities. BulwienGesa was started in 1983 and has offices in Berlin, Munich and Hamburg Germany."
        },
        {
            "partner": "RP Data",
            "country": "Australia",
            "href": "www.rpdata.com",
            "img_src": "rpdata.gif",
            "text": "Established in 1991, RP Data is the leading supplier of commercial and residential property information services throughout Australia and New Zealand. Subscription clients to RP Data&rsquo;s property information service include over 10,000 real estate agents, valuers, property developers, financial institutions and government departments."
        },
        {
            "partner": "HBS-research",
            "country": "France",
            "href": "www.laplacedelimmobilier-pro.com/index.php?lang=en",
            "img_src": "hbs.gif",
            "text": "HBS-research has a database, &ldquo;La Place de l&rsquo;Immobilier - Pro&rdquo;, covering 2 Million properties located in France. HBS-research actively researches commercial property information such as owners, tenants, past transactions, building permits and all the operational information dedicated property professionals need."
        },
        {
            "partner": "COMPARABLES.PL",
            "country": "Poland",
            "href": "www.comparables.pl",
            "img_src": "Comparables.gif",
            "text": "Comparables.pl has established Poland&rsquo;s first commercial property sales database recording transactions stretching back to 1997. The company employs an in-house team of experienced property analysts and also works closely in co-operation with Warsaw-based real estate consultancy firm, Polish Properties."
        },
        {
            "partner": "S.A. Ricci",
            "country": "Russia",
            "href": "www.ricci.ru/en/",
            "img_src": "Ricci.jpg",
            "text": "S.A. Ricci Company is one of Russia&rsquo;s leading commercial real estate consulting firms. Since the company was founded in 2005, S.A. Ricci  has been providing brokerage, consulting, valuation and research services to its clients. The company has brokered over 800 real estate investment, sales and rental deals worth more than USD 2.5 billion."
        },
        {
            "partner": "KTI Property Information",
            "country": "Finland",
            "href": "www.kti.fi",
            "img_src": "kti.gif",
            "text": "KTI has been the leading independent source for information, analysis and research services for the Finnish real estate industry since 1993.  KTI's was founded by the Turku School of Economics, the Finnish Real Estate Federation and <i>RAKLI</i> - the Finnish Association of Building Owners and Construction Clients. KTI's clients comprise all major players in the Finnish property market."
        },
        {
            "partner": "Economic Property Research Center (EPRC)",
            "country": "Hong Kong",
            "href": "www.eprc.com.hk/",
            "img_src": "eprc.gif",
            "text": "EPRC, a member of Hong Kong Economic Times Holdings, is the leading property information provider in Hong Kong. Starting its business in 1991, EPRC has the largest and most comprehensive database on all types of properties throughout the region and serves thousands of market practitioners and professionals, which include real estate developers, brokers, surveyors, financial institutions, government agencies and educational institutions."
        },
        {
            "partner": "Confidencial Imobili&aacute;rio",
            "country": "Portugal",
            "href": "www.ci-iberica.com/",
            "img_src": "imometrica.gif",
            "text": "Confidencial Imobili&agrave;rio is the leading Portuguese source for Real Estate market intelligence and has been publishing the Real Estate Index Confidencial Imobili&agrave;rio the unique measure of Portuguese inflation for real estate) for the past 20 years"
        },
        {
            "partner": "Vastgoedmarkt",
            "country": "Netherlands",
            "href": "www.vgmrealestate.nl/",
            "img_src": "vastgoedmarkt.gif",
            "text": "Vastgoedmarkt is based in the Hague and has been the leading property information newspaper for thousands of Dutch real estate professionals since 1973. VGM Real Estate has the largest and most comprehensive database on all types of properties in Holland."
        },
        {
            "partner": "Mate Plus",
            "country": "Korea",
            "href": "www.mateplus.net/eng/main/main.asp",
            "img_src": "mateplus.gif",
            "text": "Mate Plus is Korea&rsquo;s largest and most comprehensive real estate company. Based in Seoul, Mate Plus has been providing research, property management, investment advisory, brokerage, leasing, renovation, architectural and construction services to its clients since 1988."
        },
        {
            "partner": "Prime",
            "country": "Central America",
            "href": "www.prime.cr/",
            "img_src": "prime.gif",
            "text": "Prime is a real estate investment firm that specializes in sale-leaseback and build-to-suit operations in Central America. Prime is based in San Jos&eacute;, Costa Rica and produces in depth real estate market intelligence and analysis within the region."
        },
        {
            "partner": "JLR Real Estate Data Builders",
            "country": "Canada",
            "href": "www.jlr.ca",
            "img_src": "jlr.gif",
            "text": "Since 1986, JLR has been collecting, compiling, and distributing real estate transactions published at the Land Registry of Quebec. JLR has a database of more than 4 million transactions and has taken photographs of more than 2.2 million properties. JLR has recently expanded its coverage to now include other Canadian provinces as well as much of the USA."
        },
        {
            "partner": "Bregman-Baraz Real Estate",
            "country": "Israel",
            "href": "www.b-bre.com",
            "img_src": "bbre.jpg",
            "text": " Bregman-Baraz Real Estate offers high quality research and consulting services for the Israeli real estate market. The company develops indices for the Israeli CRE Market, and is the driving force behind Data Bricks Israel, the first database of commercial real estate in Israel."

        }];
    constructor(private $log: ng.ILogService) {

        this.$log = this.$log.getInstance("components.Content.LeadershipController");
        this.$log.debug("Constructed", this);
    }

}

export = DataPartnersController;
