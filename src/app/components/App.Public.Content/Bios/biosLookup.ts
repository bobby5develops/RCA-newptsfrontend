/**
 * Created by mgilligan on 9/10/2015.
 */
/// <reference path="../../../tsd.d.ts" />

import lodash = require("lodash");

var Bios = [
    {
        "id_tx": "robert_m_white_jr",
        "name_tx": "Robert M. White, Jr.",
        "suffixes_tx": "CRE, FRICS",
        "title_tx": "Founder & President",
        "blurb_tx": "<p>Robert M. White, Jr., CRE, is the founder and president of Real Capital Analytics Inc., an international research firm that publishes the Capital Trends Monthly. Real Capital Analytics provides real time data concerning the capital markets for commercial real estate and the values of commercial properties. The firm maintains offices in New York City, San Jose (CA), and London. It has about 800 clients, including the industry&rsquo;s leading brokerage firms, institutional advisors, REITs, developers, foreign investors and banks.</p><p>Mr. White is a noted authority on the real estate capital markets with credits in <i>The Wall Street Journal</i>, <i>Barron&rsquo;s</i>, <i>The Economist</i>, <i>Forbes</i>, <i>The New York Times</i>, <i>Financial Times</i>, among others. In addition, he was named one of <i>National Real Estate Investor</i> magazine&rsquo;s &ldquo;Ten to Watch&rdquo; in 2005, <i>Institutional Investor&rsquo;s</i> &ldquo;20 Rising Stars of Real Estate&rdquo; in 2006, and <i>Real Estate Forum&rsquo;s</i> &ldquo;10 CEOs to Watch&rdquo; in 2007. Previously, he spent 14 years in the real estate investment banking and brokerage industry and has orchestrated billions of commercial sales, acquisitions and recapitalizations. He was formerly a managing director and principal of Granite Partners LLC and spent nine years with Eastdil Realty in New York and London.</p><p>Mr. White is a Counselor of Real Estate, a Fellow of the Royal Institution of Chartered Surveyors and a Fellow of the Homer Hoyt Institute. He is also a member of numerous industry organizations and a supporter of academic studies. He is a graduate of the McIntire School of Commerce at the University of Virginia.</p>",
        "imageSrc_tx": "BobWhite.jpg",
        "active_fg": "true",
        "ring_fg": "true",
        "group": "nyc"
    },
    {
        "id_tx": "jeanne_jambor",
        "name_tx": "Jeanne B. Jambor",
        "suffixes_tx": "CPA",
        "title_tx": "Chief Financial Officer & Executive Vice President",
        "blurb_tx": "<p>As Chief Financial Officer and Executive Vice President, Jeanne Jambor oversees the financial affairs of the company and is responsible for the company&rsquo;s day-to-day operations, sales, account management and human resources. Joining RCA in 2007 and quickly securing growth funding, Jeanne is responsible for allocating the company&rsquo;s capital and building its financial infrastructure to meet the company&rsquo;s strategic plans.</p><p>Jeanne joined RCA with over 20 years of financial management experience specializing in high growth technology companies such as ActaMed Corporation/WebMD and Exactium Inc., where she focused on raising venture capital, executing growth strategies through partnerships and acquisitions and implementing organic growth plans.  After seeing these firms through successful exit strategies for investors and stakeholders, she started and operated her own real estate brokerage and investment company.</p><p>She holds an M.B.A. from Virginia Commonwealth University and a B.S. in Accounting from James Madison University. Jeanne is also a Certified Public Accountant.</p><p>Jeanne enjoys architecture, history, ancient cultures, and home improvement projects.</p>",
        "imageSrc_tx": "JeanneJambor.jpg",
        "active_fg": "true",
        "ring_fg": "true",
        "group": "nyc"
    },
    {
        "id_tx": "joe_mannina",
        "name_tx": "Joseph A. Mannina Jr.",
        "title_tx": "Chief Operating Officer & Executive Vice President",
        "blurb_tx": "<p>Joe Mannina brings 23 years of commercial real estate research experience to Real Capital Analytics. Previously, he served as President and Founder of SiteSales Inc, a regional verified sales comparable provider that was acquired by Real Capital Analytics in January of 2005.</p><p>Joe was formerly Vice President of Operations for publicly traded real estate information company, Comps.com of San Diego, CA.</p><p>During his 12 year tenure at Comps Infosystems, he was instrumental in executing the company's national expansion strategy culminating with its $67M Initial Public Offering in May of 1999. He was also responsible for overseeing research operations in 47 US cities with over 200 employees.</p><p>Joe earned his Bachelor&rsquo;s degree in resource economics from the University of California at Berkeley and is a licensed real estate broker in the State of California.</p><p>He enjoys spending time with his wife, Julie and two daughters, Rachel and Olivia. Joe is also an avid runner and has completed the New York City Marathon, the Sacramento Marathon and the Portland Marathon.</p>",
        "imageSrc_tx": "JoeMannina.jpg",
        "active_fg": "true",
        "ring_fg": "true",
        "group": "nyc"
    },
    {
        "id_tx": "bryan_grad",
        "name_tx": "Bryan Grad",
        "title_tx": "Managing Director of Sales & Executive Vice President",
        "blurb_tx": "<p>As Managing Director of Sales & Executive Vice President, Bryan Grad manages Real Capital Analytics&rsquo; worldwide sales team, with personnel in California, Florida, New York, New Hampshire and London. Since joining RCA in 2002, Bryan has been integral to the firm&rsquo;s rapid growth in the US and its expansion into all markets globally.</p><p>Bryan has over 20 years experience in the commercial real estate data, research and forecasting fields. Previously, he headed sales and marketing at Torto Wheaton Research (aka CBRE EA), a leading provider of data, forecasting and consulting services in the US and across the globe. Prior to that, Bryan held sales roles within the FW Dodge Division of McGraw-Hill, starting with a focus on building product manufacturers in the Northeast US and later being a key member of a development team that transformed construction industry sales lead data into actionable CRE pending supply data and analysis (known as Dodge Pipeline, later licensed to Property & Portfolio Research and subsequently to CBRE EA).</p>",
        "imageSrc_tx": "BryanGrad.jpg",
        "active_fg": "true",
        "ring_fg": "true",
        "group": "nyc"
    },
    {
        "id_tx": "stephen_g_williams",
        "name_tx": "Stephen G. Williams",
        "suffixes_tx": "FRICS",
        "title_tx": "Executive Managing Director",
        "blurb_tx": "<p>A past President of the RICS, Steve has worked on all five continents advising the capital markets about the value of securitized assets. Recently, his manuscripts &ldquo;Facing the Global Challenge&rdquo; and &ldquo;What&rsquo;s It Worth&rdquo; have been recognized by the UN in Geneva and New York for their insightful commentaries on market transparency.</p><p>A frequent presenter at conferences, Steve holds an Honorary Fellowship from Liverpool John Moores University (LJMU) in UK and is a former Chair of the Center for Real Estate Research at Tsinghua University in Beijing.  In the USA, he is a former Chair of the Appraiser Qualifications Board, a visiting lecturer at Duke University and a Board member of the University of Wisconsin&rsquo;s Global Real Estate Masters (GREM) program. He sits on several    editorial panels for peer reviewed publications.</p><p>Steve is a Freeman of the City of London and a member of London&rsquo;s Worshipful Company of Chartered Surveyors.</p>",
        "imageSrc_tx": "SteveWilliams.jpg",
        "active_fg": "true",
        "ring_fg": "true",
        "group": "nyc"
    },
    {
        "id_tx": "simon_mallinson",
        "name_tx": "Simon Mallinson",
        "suffixes_tx": "MRICS",
        "title_tx": "Executive Managing Director, EMEA & APAC",
        "blurb_tx": "<p>Simon Mallinson joined Real Capital Analytics in January 2013. Simon is responsible for the client service, management and development of RCA&rsquo;s expanding EMEA business. He also shares responsibility for RCA&rsquo;s Asia-Pacific business with a focus on client and analytic services.</p><p>Before joining RCA Simon was Senior Director leading European Research at Invesco Real Estate. Prior to Invesco, Simon held a number of roles with IPD in London and the United States. As Head of US Services he established IPD&rsquo;s first North American office.</p><p>As of December 2014 Simon is a Board Member of NCREIF and is active across a number of European and Asian associations. He also sits on the European Research Committee of INREV.</p>",
        "imageSrc_tx": "Simon.jpg",
        "active_fg": "true",
        "ring_fg": "true",
        "group": "nyc"
    },
    {
        "id_tx": "jim_costello",
        "name_tx": "Jim Costello",
        "suffixes_tx": "CRE",
        "title_tx": "Senior Vice President",
        "blurb_tx": "<p>Jim Costello has worked in the CRE space on issues of urban economics since 1990, including a 20 year stint at CBRE. In his time at CBRE he helped expand analytical capability of the Torto Wheaton Research (aka CBRE EA) team by integrating the forecast results into more direct applications related to investor questions on asset values.</p><p>Jim is expanding the capabilities of the Real Capital Analytics team on issues of real estate market dynamics. Jim has a Master&rsquo;s degree in economics and is a member of the Counselors of Real Estate.</p>",
        "imageSrc_tx": "jimcostello.jpg",
        "active_fg": "true",
        "ring_fg": "true",
        "group": "nyc"
    },
    {
        "id_tx": "john_poulin",
        "name_tx": "John Poulin",
        "title_tx": "Vice President of Technology",
        "blurb_tx": "<p>John (JP) Poulin is the Vice President of Technology at Real Capital Analytics.</p><p>JP is a driven computer scientist, innovator and technology executive with more than 15 years of industry experience.</p><p>Much of his career has been spent in the engineering of vertical search technology and data-driven solutions for the financial service and life sciences industries.</p><p>He is a successful software start-up technology entrepreneur with the distinction of being the Chief Architect to a vertical search start-up sold to Forbes Media in 2009 and the Chief Architect to a social media start-up sold to the New York Times Digital in 1999.</p>",
        "imageSrc_tx": "jpheadshot.jpg",
        "active_fg": "true",
        "ring_fg": "true",
        "group": "nyc"
    },
    {
        "id_tx": "joseph_kelly",
        "name_tx": "Joseph Kelly",
        "suffixes_tx": "BSc, MSc",
        "title_tx": "Director of Market Analysis",
        "blurb_tx": "<p>Joseph is a Director of Market Analysis for the EMEA region at <strong>Real Capital Analytics</strong> (RCA), contributing to RCA&rsquo;s unrivalled capital market research both within Europe and globally. His analysis forms part of RCA&rsquo;s industry leading reports on Europe and Global Capital Trends, in addition to delivering bespoke research and consultancy services to RCA clients.</p><p>He was previously part of the global real estate investment and forecasting team at <strong>Property Market Analysis</strong>. His contributions at PMA underlined the key investment forecasting outputs of the European, Asian and US services. Having joined PMA while completing his Master&rsquo;s Degree at Cass Business School, he was involved in many of the advancements made to PMA's global investment analysis output during that period.</p>",
        "imageSrc_tx": "josephkelly.jpg",
        "active_fg": "true",
        "ring_fg": "false",
        "group": "uk"
    },
    {
        "id_tx": "nidhya_Ramasubbu",
        "name_tx": "Nidhya Ramasubbu",
        "title_tx": "Investment Analyst",
        "blurb_tx": "<p>We are delighted to welcome Nidhya Ramasubbu to the London team. Nidhya joined the RCA London team in July 2011 as an intern and now took on the role as a Investment Analyst with a focus on Germany and Italy. She previously worked for a social business as well as a for a German development firm. She also interned for several UN organizations such as the UN in New York and UNESCO in Paris and UNHCR in Berlin.</p><p>Nidhya has a Masters Degree in Development and Urbanisation from the London School of Economics and Political Studies and a Bachelors Degree in European Social and Political Studies from the University College London. Having worked and studied in different European countries as well as the US, she is fluent in German, English, Italian and two Indian languages.</p>",
        "imageSrc_tx": "nidhyaramasubbu.jpg",
        "active_fg": "true",
        "ring_fg": "false",
        "group": "uk"
    },
    {
        "id_tx": "bryan_grad",
        "name_tx": "Bryan Grad",
        "title_tx": "Managing Director of Sales & Executive Vice President",
        "blurb_tx": "<p>As Managing Director of Sales & Executive Vice President, Bryan Grad manages Real Capital Analytics&rsquo; worldwide sales team, with personnel in California, Florida, New York, New Hampshire and London. Since joining RCA in 2002, Bryan has been integral to the firm&rsquo;s rapid growth in the US and its expansion into all markets globally.</p><p>Bryan has over 20 years experience in the commercial real estate data, research and forecasting fields. Previously, he headed sales and marketing at Torto Wheaton Research (aka CBRE EA), a leading provider of data, forecasting and consulting services in the US and across the globe. Prior to that, Bryan held sales roles within the FW Dodge Division of McGraw-Hill, starting with a focus on building product manufacturers in the Northeast US and later being a key member of a development team that transformed construction industry sales lead data into actionable CRE pending supply data and analysis (known as Dodge Pipeline, later licensed to Property & Portfolio Research and subsequently to CBRE EA).</p>",
        "imageSrc_tx": "BryanGrad.jpg",
        "active_fg": "true",
        "ring_fg": "false",
        "group": "sales_us"
    },
    {
        "id_tx": "susan_kane",
        "name_tx": "Susan Kane",
        "title_tx": "Director, Sales",
        "blurb_tx": "<p>Susan Kane serves an international client base as Director of Sales with RCA and is located in New York City. She brings 17 years of real estate sales experience to Real Capital Analytics.</p><p>Susan began her career in management with Hyatt Corporation. She has held senior-level sales positions within the real estate publishing arena, beginning with Real Estate Media where, in addition to her national sales position, she assisted with the launch of their regional line of real estate magazines. She also worked with national real estate clientele while with Commercial Property News and Grid magazine. Most recently, she held the title of Director of Sales for SelectLeaders.com, a real estate recruitment job site where she not only directed the sales efforts and team, but also launched various new recruitment vehicles.</p><p>Susan holds a BA in Hospitality Management from Johnson & Wales University in Providence, RI. Away from professional work, Susan enjoys running and gardening.</p>",
        "imageSrc_tx": "Susan.jpg",
        "active_fg": "true",
        "ring_fg": "false",
        "group": "sales_us"
    },
    {
        "id_tx": "nebin_schulman",
        "name_tx": "Nebin Schulman",
        "title_tx": "Director, Sales",
        "blurb_tx": "<p>Nebin Schulman is a Director of Sales for Real Capital Analytics with over 13 years of experience. She is responsible for new business development, client account management and renewals.</p><p>Prior to joining Real Capital, Nebin worked at Dataquick Information Systems where she focused on the sale of real property data and real estate information solutions. She has also worked for Sungard Data Systems and Envirocheck Solutions, Inc.</p><p>Nebin earned a B.S. in Environmental Business Management from Colorado State University. In her spare time she enjoys running and spending time with her husband and two children.</p>",
        "imageSrc_tx": "Nebin.jpg",
        "active_fg": "true",
        "ring_fg": "false",
        "group": "sales_us"
    },
    {
        "id_tx": "michael_sweezey",
        "name_tx": "Michael Sweezey",
        "title_tx": "Director, Sales",
        "blurb_tx": "<p>Michael Sweezey is Director of Sales for Real Capital Analytics and is responsible for new business development, client account management and renewals. </p><p>Previously, Michael worked at Investors Bank & Trust (now State Street Corporation), where he was responsible for the daily activities, such as custody accounting services, performance analysis and daily pricing for various multi-million dollar accounts. He earned his bachelor&rsquo;s degree with concentrations in small business development and entrepreneurship from W. P. Carey School of Business &ndash; Arizona State University. </p><p>Originally from the Boston area, he resides in southern NH with his wife, Maria, and their cat Gizmo.</p>",
        "imageSrc_tx": "Michael.jpg",
        "active_fg": "true",
        "ring_fg": "false",
        "group": "sales_us"
    },
    {
        "id_tx": "karen_williams",
        "name_tx": "Karen Williams",
        "title_tx": "Director, Sales",
        "blurb_tx": "<p>For over 35 years Karen has been a State Certified appraiser specializing in quality control and forensic reviews for national lenders. She has served on Louisiana&rsquo;s State Appraisal Board and the Residential Board of the Royal Institution of Chartered Surveyors. </p><p>As an educator, Karen has authored on-line residential and investment real estate courses for a national provider. She is a freeman of the City of London, (where she spent a year), and a member of the Chartered Surveyors Livery Company. In her travels, she has visited many of the RICS world regional offices.</p>",
        "imageSrc_tx": "Karen.jpg",
        "active_fg": "true",
        "ring_fg": "false",
        "group": "sales_us"
    },
    {
        "id_tx": "monica_n_wolfson",
        "name_tx": "Monica Wolfson",
        "title_tx": "Director, Sales",
        "blurb_tx": "<p>Monica brings an international flavor to the RCA team, coming from Scotland. She has 20  years of real estate experience, working in London with Burford Group on the principle side and Allsops and Co on the appraisal brokerage side. She also started her own London firm Monica Wolfson Chartered Surveyors. She moved to New York in 2000, working on the investment sales team at Newmark and Company, coordinating the research for the brokers. She was one of the first clients of RCA. In 2004 she joined CB Richard Ellis as a leasing broker focusing on international banks and hedge funds. At RCA, Monica works closely with hotel clients and considers the hotel sector her specialty. </p><p>Since her arrival in the States, Monica has been highly active in the RICS (Royal Institution of Chartered Surveyors), the world&rsquo;s leading professional real estate organization with 110,000 members in 120 countries. She is also a RICS accessor. She served four years as president of the New York Chapter while working for the RICS US National Board and helping to grow RICS membership significantly. She is FRICS, Fellow of the Royal Institution of Chartered Surveyors, a designation reserved for the top 5% of real estate professionals globally. </p><p>Monica has an MA in Art History and Theater from University of Glasgow and a diploma in Urban Property Appraisal from University of Strathclyde, Glasgow where she was awarded the Court Medal and prize for being the \"\"Most Outstanding Student of the Year\"\". She also spent a year as an exchange student at University of Massachusetts in Amherst. Monica enjoys yoga, hiking, swimming, and writing and performing her own stand-up comedy and short stories.</p>",
        "imageSrc_tx": "Monica.jpg",
        "active_fg": "true",
        "ring_fg": "false",
        "group": "sales_us"
    },
    {
        "id_tx": "Luc Figueras-Gibert",
        "name_tx": "Luc Figueras-Gibert",
        "title_tx": "Director, Sales",
        "blurb_tx": "<p>Luc is responsible for driving Real Capital Analytics&rsquo; business development initiatives across the EMEA region. Luc joined RCA from Experian Economics, where he was supporting a number of real estate investors across key markets in Europe. Prior to that, Luc worked at IHS Global Insight where he was responsible for the commercialisation of macroeconomic and industry forecasts across a wide range of sectors. Luc studied at the International School of Management in Dormund, Germany, and the University of Franche-Comt&eacute;, Besan&ccedil;on, France, where he gained a BA in International Business & Foreign Languages. Luc is native French, and is fluent in both English and German.</p>",
        "imageSrc_tx": "LucFigueras.jpg",
        "active_fg": "true",
        "ring_fg": "false",
        "group": "sales_emea"
    }];

export var leadership = lodash.filter(Bios, { active_fg: 'true', group: 'nyc'});

export var salespersons = lodash.filter(Bios, { active_fg: 'true', group: 'sales_us'});
