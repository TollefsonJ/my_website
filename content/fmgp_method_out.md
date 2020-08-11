---
bibliography: /Users/jtollefs/Documents/bibliography.bib
csl: '/Users/jtollefs/Documents/SOCIOLOGY/PROJECTS/PlainTextEditing/styles/sage-harvard.csl'
---

Here's a description of the analysis process as it stands, as succinct
as possible.

`<a href="/sanborn/LOC-Providence1889vol1_00005L.jpg">`{=html}`<img src="/sanborn/LOC-Providence1889vol1_00005L.jpg" style="float: left; width: 40%; margin-right: 3%; margin-bottom: 0.5em;">`{=html}
`<a href="/sanborn/LOC-Providence1889vol1_00005L_out.jpg">`{=html}`<img src="/sanborn/LOC-Providence1889vol1_00005L_out.jpg" style="float: left; width: 40%; margin-right: 3%; margin-bottom: 0.5em;">`{=html}
```{=html}
<p style="clear: both;">
```
`</a>`{=html}

`<a href="/sanborn/DIG-Providence1920vol1_00027.jpg">`{=html}`<img src="/sanborn/DIG-Providence1920vol1_00027.jpg" style="float: left; width: 40%; margin-right: 3%; margin-bottom: 0.5em;">`{=html}
`<a href="/sanborn/DIG-Providence1920vol1_00027_out.jpg">`{=html}`<img src="/sanborn/DIG-Providence1920vol1_00027_out.jpg" style="float: left; width: 40%; margin-right: 3%; margin-bottom: 0.5em;">`{=html}
```{=html}
<p style="clear: both;">
```
`</a>`{=html}

Introduction
------------

From the mid-19th to the mid-20th century, most homes, institutions, and
factories in the US and much of Europe relied on gas produced from coal
to light lamps and kitchen stoves. The production of manufactured gas
(MFG, coal gas, or "town gas") was a major business, and homes and
business were increasingly linked via city-wide networks of underground
gas pipes to central MFG production sites. Populous cities might include
several dozen such sites, and even smaller, remote cities would have had
at least one MFG plant by the end of the 1800s (Brown, 1886). Gas
utilities additionally relied upon a network of intermediary gasholders
(or "gasometers") used to maintain adequate gas pressure for far-flung
neighborhoods or institutions (Hatheway, 2012). Utility sites were
joined by numerous smaller plants built to provide lighting, heat, or
energy to individual institutions, including hospitals, educational
institutions, manufacturing plants, railroad yards, and private estates.
As MFG gave way to natural gas in the mid-20th century, the production
and distribution sites that were once a striking visual symbol of the
industrialized city were largely abandoned; some sites fell into
disrepair, while others were demolished and the sites redeveloped for
industrial, commercial, or residential use.

This is a problem because the MFG industry produced substantial waste
products under minimal environmental regulation, principally coal tar
and tar-related wastes (Ecology & Environment Inc, 1986; Hatheway, 2012;
White and Barker, 1911). FMGP sites therefore signify the possible
presence of compounds which present significant health hazards: Coal tar
residuals contain the polycyclic aromatic hydrocarbon group of
compounds, which represent both carcinogenic and mutagenic risk (Kim et
al., 2013). Tar wastes are also persistent: Absent remediation, the
risks associated with FMGP byproducts will not diminish (Hatheway,
2012). Health risks are compounded by the fact that pre-EPA zoning
regulations largely failed to keep industry out of residential areas
(Frickel and Elliott, 2018). In other words, undetected FMGP sites may
lurk beneath areas not traditionally reserved for heavy industry,
including residential or commercial corridors; waste compounds might
additionally cross parcel boundaries through flooding or other hydraulic
action.

Former manufactured gas plants (FMGPs) are routinely discovered by
accident - perhaps as often as once a month across the US (Hatheway,
2012) - including the 1980 discovery in Stroudsburg, PA, of the first
site to be listed under the Superfund program (Phillips, 1991). Despite
demonstrated health risks associated with exposure to MFG byproducts and
the near-total lack of regulatory oversight over the century-long span
of the MFG industry, however, no full accounting of the MFG production
and distribution network has been achieved. This is in part because of
several limitations in available data which have made the identification
of FMGP site locations at a comprehensive scale an expensive and
time-consuming undertaking.

In response to these limitations, we propose a new method to precisely
identify FMGP sites on a national scale by applying computer vision
functions to digitized images of Sanborn fire insurance maps. This
method focuses on a unique visual component of MFG production and
distribution sites: The gasometer, or gas holder, a large circular
building captured in period maps as a distinct circular outline. We
developed Detect\_Circles, a tool to identify circular structures in
Sanborn map documents, and tested it with images drawn from five sets of
Sanborn map scans covering the city of Providence, RI. Our results
demonstrate that computer-aided map coding significantly reduces the
time required to accurately locate possible FMGPs on a national scale
and across multiple historical timepoints. This approach allows for a
more complete accounting of the growth and extent of the MFG industry as
a whole; it also makes way for a spatial analysis of the distribution of
FMGP sites, as both a key component of the growth of the industrial city
and as a source of contemporary contamination and toxic risk.

Significance
------------

FMGP sites represent a particularly pressing case for environmental
researchers, sociologists, and communities alike. Despite the impact of
the MFG industry on daily life, the built environment, and the
industrial economy for nearly a century, contemporary social and
environmental scientists have yet to address the industry as a systemic
source of persistent urban contamination. Moreover, even as individual
FMGP sites have dogged municipalities and agencies responsible for site
remediation, researchers and remediation professionals are ill-equipped
to track possible FMGP-related toxicity. The remains of the MFG industry
stretch across every major and minor urban center in the United States,
yet the discovery of FMGP sites is largely accidental (Hatheway, 2012).
These challenges are mirrored in related research into legacy urban
hazards more broadly. Three effects compound to produce the unfortunate
result that the study of legacy urban contaminants has, until recently,
proceeded with halting progress: Historically insufficient regulatory
oversight, decades of redevelopment and urban change, and contemporary
regulatory practices that focus on large and visible remediation efforts
at the expense of smaller, pedestrian sites (Frickel and Elliott, 2018).
The development of new methods to locate and assess possible sources of
legacy contamination is thus a necessary first step to introducing a
class of site and contaminant to spatial and sociological analysis.

For it to be both scalable and accurate, an effective site
identification method must satisfy requirements of both scope and
specificity. By scope, we mean that data should be available on a
consistently wide range of geographies and time periods, and must be in
a form that lends itself to rapid identification using
easily-reproducible methods. By specificity, we mean that each site must
be precisely located in space and time, and must be accurately
identified. A district holding station, for instance, presents a
different level of hazard from a central production complex, and must be
identifiable as such. Due to limitations in available data, prior
attempts at identification have largely satisfied either the "scope" or
"specificity" requirement while neglecting the other. This division is
facilitated by the major types of historical FMGP data that are readily
available.

Prior attempts to locate FMGP sites on a broad scale have primarily
relied on national gas industry directories, principally *Brown's
Directory of American Gas Companies*, published annually starting in
1887. Industry directories list the names of manufactured gas production
companies, chief company officers, manufacturing statistics, and gas
service areas, and provide a useful measure of the size and scale of gas
production in any given city. But *Brown's* and other directories do not
identify street addresses for production or distribution sites. To
precisely geolocate former gas infrastructure, industrial historians and
environmental remediation specialists generally rely on historic
building-level atlases, most prominently those produced by the Sanborn
Map Company and other fire insurance mappers. Sanborn maps were produced
for nearly all US cities with a population greater than approximately
8,000 (Hatheway, 2012). Sanborn maps were published as large, multi-page
atlases, and include such information as building perimeter outlines and
details on site use and ownership. Their high degree of street-level
detail allow for the precise geolocation of gas production, storage, and
distribution sites. For the same reason, however, it is impractical to
rely on Sanborn maps to locate infrastructure at any appreciable
geographic scope. To illustrate this, we briefly present two research
efforts that typify approaches that focus on scope *or* specificity, but
fail to precisely identify site en masse.

Our first study is the 1985 EPA effort to identify FMGP sites based on
industry directory listings (Radian Corporation, 1985). Focusing on
10-year increments of Brown's Directory publications, the EPA study
estimated the number of large FMGP producers in the US at about 1,500.
It was the first and only attempt at a national FMGP census, but - like
other approaches that rely on industry directories alone - the EPA
attempt was later shown to have greatly underestimated the number of
possible FMGP sites nationally (Hatheway, 2012) for two reasons. Gas
industry directories list only the cities in which major MFG producers
were registered; second, directories do not indicate the number or
location of gas industry production, storage, or distribution sites.
Directory listings therefore drastically underestimate the scale of
MFG's spatial legacy, and do not provide sufficient information to
indicate the precise street-level location of manufactured gas
infrastructure. Using greatly expanded criteria, Allen W. Hatheway's
research estimates the total number of FMGP sites at between 33,010 and
50,308 nationwide, many times greater than the number of sites
identified by the EPA (2012).

Our second example is a 1986 project that sought to locate the FMGP
sites identified in the 1985 EPA effort (Ecology & Environment Inc,
1986). This second study was conducted only for EPA Region X (Alaska,
Idaho, Oregon, and Washington), representing just 35 of the 1,500 sites
identified the year before. Researchers identified site locations by
pairing Brown's Directory listings with Sanborn map data, and
recommended sites for possible remediation based on information on
current use. Study authors were aware that relying on Brown's Directory
information meant that they were likely missing district stations and
other outlying utility sites. Their use of Sanborn map data nonetheless
represented a clear extension from the broad-based approach of the 1985
EPA study, and study authors successfully located several dozen FMGP
sites, several of which were shown to present possible hazards to human
health. According to study documentation, however, locating map
information for the 35 sites was budgeted at a full 86 hours - nearly
two and a half hours per site. Researchers were also prepared with a
full list of target sites prior to conducting street-level map searches;
in contrast, the task of locating an unknown number of production,
storage, and distribution sites by definition does not begin with a
known, fixed universe of site names.

Both EPA efforts were shaped by the limitations built into their input
data. Directory listings require little sifting to identify a broad
range of possible FMGP sites within a given city or state, without
providing information on where those sites may be located; Sanborn maps
require significant investment to precisely locate specific sites, and
benefit from having prior information on site whereabouts. See Table
{([**???**]{.citeproc-not-found data-reference-id="tbl:approaches"})}
below.

  Source type            Data          Scope      Pub. frequency         Specificity
  ---------------------- ------------- ---------- ---------------------- -------------------------
  Industry directories   Centralized   National   Annual                 Company name only
  Sanborn maps           Fragmented    National   \~10 year increments   Multiple site locations

Sanborn maps
------------

Sanborn maps were published regularly starting in the late 19th century.
Sanborn atlases cover most US cities with a population greater than
about 6000 (Hatheway, 2012), and most larger cities were mapped and
remapped at regular intervals to account for changes to the urban
landscape. Atlases consist of multiple map volumes made up of several
hundred pages representing just a few square blocks of city space.
Today, map files are available for public use primarily via three
database providers with different approaches to digitization, file
storage, and access.

  --------------------------------------------------------------------------
  Source        Completeness      Access        Map quality   Download
                                                              availability
  ------------- ----------------- ------------- ------------- --------------
  ProQuest      Most complete     Many          Low quality   No bulk
  Sanborn                         university    B+W line      download
  Digital Ed.                     and public    drawings      
                                  libraries                   

  FIMo          Most complete     Some          High quality  No bulk
                                  university    color scans   download
                                  and public                  
                                  libraries                   

  Library of    Very complete     Publicly      High quality  Simple bulk
  Congress                        available     color scans   API
  --------------------------------------------------------------------------

Library of Congress (LOC) maps are most amenable to large-scale map
analysis for two reasons. First, LOC maps are available for bulk
download using a simple script to communicate with the LOC API. The API
allows for map downloads at any regional and temporal scale; for
example, a single API query returns all Sanborn files for every city in
New England across every available publication year. Second, LOC files
are stored as high quality digital color scans. Most circular features
are color-filled and therefore more easily identifiable using the
Hough.Circles package.

ProQuest's "Sanborn Digital Edition" and Fire Insurance Maps Online
(FIMo) also host Sanborn map images. ProQuest maps are rendered as black
and white line-drawings; they are widely available for multiple cities
over multiple years, but suffer from low scan quality and frequent
misprints. FIMo maps, like LOC map scans, are available in full color,
but suffer from poor download resolution. The ProQuest and FIMo
databases are marginally more complete than the LOC repository; neither
database allows for bulk file downloads, however, severely limiting
their utility for map analysis at a broad spatial and temporal scale. It
is possible to partially automate the download process, using the CURL
utility, by taking advantage of the fact that the ProQuest and Sanborn
databases store map pages according to a predictable sequence of URLs.
FIMo maps are stored in a sequence of logically-numbered JPG files with
a common base URL, which allows us to download FIMo maps city-by-city or
volume-by-volume. The ProQuest database instead iterates components of
the URL path for each maps page, and stores map files as PDF documents
with a single filename ("default.pdf"). The ProQuest database structure
requires that we first generate a list of unique URLs based on a set of
predictable parameters, which can automated for each map volume using a
simple Python script. Even with the help of the CURL utility, however,
ProQuest and FIMo maps are much less amenable to bulk analysis.

Map analysis
------------

We use a simple Python script ("Detect\_Circles") to analyze Sanborn map
images for circular features that correspond with possible FMGP building
outlines.

::: {#refs .references .hanging-indent}
::: {#ref-ecologyenvironmentincCoalOilGasification1986}
Ecology & Environment Inc (1986) *Coal/oil gasification site study,
Region X*. TDD R10-8405-03, November. Seattle, WA: US Environmental
Protection Agency.
:::

::: {#ref-frickelSitesUnseenUncovering2018}
Frickel S and Elliott JR (2018) *Sites Unseen: Uncovering Hidden Hazards
in American Cities*. New York: Russel Sage Foundation.
:::

::: {#ref-hathewayRemediationFormerManufactured2012}
Hatheway AW (2012) *Remediation of Former Manufactured Gas Plants and
Other Coal-Tar Sites*. Boca Raton, FL: CRC Press.
:::

::: {#ref-radiancorporationSurveyTownGas1985}
Radian Corporation (1985) *Survey of town gas and by-product production
and locations in the US (1880-1950)*. EPA-600/7-85-004, February. US
Environmental Protection Agency.
:::
:::
