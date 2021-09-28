---
title: "FMGP methods"
date: 2020-08-04T14:27:38-04:00
draft: false
---

# Detecting FMGP sites with OpenCV

→[Frickel, S. and Tollefson, J. (2021, in preparation]({{< ref EIF.md>}})

→[Tollefson, J., Frickel, S. and Restrepo, I. (R+R at PLOS One)]({{< ref comp.md>}})


This is a project to detect former manufactured gas plants (FMGP) using OpenCV freeware (http://opencv.org) to pass candidate map regions to a convolutional neural network (CNN) trained to identify the circular gasometer structures that signify MGPs and district gasometers. Our "Detect_MGP" approach reduces the time required to manually code map images by up to 90%, with a recall rate of approximately 85-90%.

### Introduction

From the mid-19th to the mid-20th century, most homes, institutions, and factories in the US and much of Europe relied on gas produced from coal to light lamps and kitchen stoves. The production of manufactured gas (MFG, coal gas, or "town gas") was a major business, and homes and business were increasingly linked via city-wide networks of underground gas pipes to central MFG production sites. Populous cities might include several dozen such sites, and even smaller, remote cities would have had at least one MFG plant by the end of the 1800s (Brown, 1886). Gas utilities additionally relied upon a network of intermediary gasholders (or "gasometers") used to maintain adequate gas pressure for far-flung neighborhoods or institutions (Hatheway, 2012). Utility sites were joined by numerous smaller plants built to provide lighting, heat, or energy to individual institutions, including hospitals, educational institutions, manufacturing plants, railroad yards, and private estates. As MFG gave way to natural gas in the mid-20th century, the production and distribution sites that were once a striking visual symbol of the industrialized city were largely abandoned; some sites fell into disrepair, while others were demolished and the sites redeveloped for industrial, commercial, or residential use.  

This is a problem because the MFG industry produced substantial waste products under minimal environmental regulation, principally coal tar and tar-related wastes (Ecology & Environment Inc, 1986; Hatheway, 2012; White and Barker, 1911). FMGP sites therefore signify the possible presence of compounds which present significant health hazards: Coal tar residuals contain the polycyclic aromatic hydrocarbon group of compounds, which represent both carcinogenic and mutagenic risk (Kim et al., 2013). Tar wastes are also persistent: Absent remediation, the risks associated with FMGP byproducts will not diminish (Hatheway, 2012). Health risks are compounded by the fact that pre-EPA zoning regulations largely failed to keep industry out of residential areas (Frickel and Elliott, 2018). In other words, undetected FMGP sites may lurk beneath areas not traditionally reserved for heavy industry, including residential or commercial corridors; waste compounds might additionally cross parcel boundaries through flooding or other hydraulic action.

Former manufactured gas plants (FMGPs) are routinely discovered by accident - perhaps as often as once a month across the US (Hatheway, 2012) - including the 1980 discovery in Stroudsburg, PA, of the first site to be listed under the Superfund program (Phillips, 1991). Despite demonstrated health risks associated with exposure to MFG byproducts and the near-total lack of regulatory oversight over the century-long span of the MFG industry, however, no full accounting of the MFG production and distribution network has been achieved. This is in part because of several limitations in available data which have made the identification of FMGP site locations at a comprehensive scale an expensive and time-consuming undertaking.

In response to these limitations, we propose a new method to precisely identify FMGP sites on a national scale by applying computer vision functions to digitized images of Sanborn fire insurance maps. This method focuses on a unique visual component of MFG production and distribution sites: The gasometer, or gas holder, a large circular building captured in period maps as a distinct circular outline. We developed Detect\_Circles, a tool to identify circular structures in Sanborn map documents, and tested it with images drawn from five sets of Sanborn map scans covering the city of Providence, RI. Our results demonstrate that computer-aided map coding significantly reduces the time required to accurately locate possible FMGPs on a national scale and across multiple historical timepoints. This approach allows for a more complete accounting of the growth and extent of the MFG industry as a whole; it also makes way for a spatial analysis of the distribution of FMGP sites, as both a key component of the growth of the industrial city and as a source of contemporary contamination and toxic risk.

### Sanborn maps
Sanborn maps were published regularly starting in the late 19th century. Sanborn atlases cover most US cities with a population greater than about 6000 (Hatheway, 2012), and most larger cities were mapped and remapped at regular intervals to account for changes to the urban landscape. Atlases consist of multiple map volumes made up of several hundred pages representing just a few square blocks of city space. Today, map files are available for public use primarily via three database providers with different approaches to digitization, file storage, and access.

| Source | Completeness | Access | Map quality | Download availability |
|---      |----       |---    |---|---|
| ProQuest Sanborn Digital Ed. | Most complete  | Many university and public libraries | Low quality B+W line drawings | No bulk download |
| FIMo | Most complete | Some university and public libraries | High quality color scans | No bulk download |
| Library of Congress  | Very complete | Publicly available | High quality color scans | Simple bulk API |

Library of Congress (LOC) maps are most amenable to large-scale map analysis for two reasons. First, LOC maps are available for bulk download using a simple script to communicate with the LOC API. The API allows for map downloads at any regional and temporal scale; for example, a single API query returns all Sanborn files for every city in New England across every available publication year. Second, LOC files are stored as high quality digital color scans. Most circular features are color-filled and therefore more easily identifiable using the Hough.Circles package.

ProQuest's "Sanborn Digital Edition" and Fire Insurance Maps Online (FIMo) also host Sanborn map images. ProQuest maps are rendered as black and white line-drawings; they are widely available for multiple cities over multiple years, but suffer from low scan quality and frequent misprints. FIMo maps, like LOC map scans, are available in full color, but suffer from poor download resolution. The ProQuest and FIMo databases are marginally more complete than the LOC repository; neither database allows for bulk file downloads, however, severely limiting their utility for map analysis at a broad spatial and temporal scale. It is possible to partially automate the download process, using the CURL utility, by taking advantage of the fact that the ProQuest and Sanborn databases store map pages according to a predictable sequence of URLs. FIMo maps are stored in a sequence of logically-numbered JPG files with a common base URL, which allows us to download FIMo maps city-by-city or volume-by-volume. The ProQuest database instead iterates components of the URL path for each maps page, and stores map files as PDF documents with a single filename ("default.pdf"). The ProQuest database structure requires that we first generate a list of unique URLs based on a set of predictable parameters, which can automated for each map volume using a simple Python script. Even with the help of the CURL utility, however, ProQuest and FIMo maps are much less amenable to bulk analysis.

### Map analysis
I'll now explain the full analysis pipeline. The figure below displays the Detect_MGP workflow, which consists of the following steps: (1) Acquiring digital Sanborn map scans in bulk using the Library of Congress download API; (2) Extracting regions of interest that correspond to circular features of a given radius by applying the Hough.Circles algorithm to Sanborn map images; (3) Resizing circular regions to 64 x 64 pixels and standardizing pixel values; (4) Classifying extracted regions as MGP or non-MGP features using a CNN classifier; (5) Post-processing MGP features to remove extreme values, based on the mean and standard deviation of image pixels; and (6) Returning full map pages for final visual inspection. The following sections outline each of these steps in detail.

<a href="/mgp/detect_mgp/workflow.eps"><img src="/mgp/detect_mgp/workflow.jpg" style="float: left; width: 95%; margin-right: 3%; margin-bottom: 0.5em;">
</a>

### Data
We processed 16,393 individual map pages through the Detect_MGP pipeline. We selected map data from Chicago, San Francisco, Portland, New Orleans, the New York City area, and the state of Rhode Island, with publication years ranging from {{circles.yearmin}} to {{circles.yearmax}}. Map data were selected to cover a range of publication years and geographic locations to account for variation in map style and the built environment. While Sanborn maps are remarkably consistent, several regional and temporal variations are noticeable, including minor changes in coloration and font between the earliest and latest map volumes we examined. The distribution of false-positive map features also varies slightly by region: San Francisco, for instance, includes a relatively high density of water towers and cisterns, while many smaller Rhode Island town were mapped using circular labels of a similar size to large gasometer structures. Aggregating map images from a diverse spatial and temporal sample allows us to input a wide array of circular map features into our CNN algorithm, increasing the overall generalizability of the Detect_MGP pipeline.



See below for example input/output image pairs for ProQuest and LOC maps, respectively.

#### LOC input/output images
<a href="/sanborn/LOC-Providence1889vol1_00005L.jpg"><img src="/sanborn/LOC-Providence1889vol1_00005L.jpg" style="float: left; width: 40%; margin-right: 3%; margin-bottom: 0.5em;">
<a href="/sanborn/LOC-Providence1889vol1_00005L_out.jpg"><img src="/sanborn/LOC-Providence1889vol1_00005L_out.jpg" style="float: left; width: 40%; margin-right: 3%; margin-bottom: 0.5em;">
<p style="clear: both;">
</a>

#### ProQuest input/output images

<a href="/sanborn/DIG-Providence1920vol1_00027.jpg"><img src="/sanborn/DIG-Providence1920vol1_00027.jpg" style="float: left; width: 40%; margin-right: 3%; margin-bottom: 0.5em;">
<a href="/sanborn/DIG-Providence1920vol1_00027_out.jpg"><img src="/sanborn/DIG-Providence1920vol1_00027_out.jpg" style="float: left; width: 40%; margin-right: 3%; margin-bottom: 0.5em;">
<p style="clear: both;">
</a>

### Outcome
Detect_Circles parameters were tuned to minimize false positives while ensuring that the algorithm did not fail to identify any "true" circles. An analysis of Providence, RI area maps covering the years 1889, 1899, 1920-21, and 1921-56 reveals that the Detect_Circles script accurately identifies all circular features and reduces the number of images for manual coding by 85-90%, making it possible to identify former manufacture gas production and distribution sites at a much greater geographic and temporal scale.

### Remaining challenges
Sanborn map images are remarkably consistent. Map pages were published with a predictable scale and the style of colors, lines, and building footprints is largely unchanged over the seventy years separating the first and last available publication dates. Maps do present several challenges for a detection algorithm that focuses on circular features, however.

First, all map pages include the image of a compass rose to orient readers directionally. Some map volumes printed the compass image with a central circular figure, of a comparable size to many FMGP site circles. Expanding the detection algorithm beyond Providence requires that we exclude compass circles from being detected as relevant features. This is complicated by the fact that there is no way to determine whether a compass circle is present in a given map volume without visual inspection.

Second, some map pages include prominent circular or ovular titles, many - but not all - of which are picked up by the Detect_Circles script as a possible positive result. Increasing the stringency of Hough.Circles parameters to the point that ovular titles are not recognized as relevant circular features has the unacceptable consequence of causing the Detect_Circle algorithm to skip over poorly-printed or misshaped FMGP circles.

A possible solution to both above challenges is to run all map images through a pre-analysis that screens for the presence of circles associated with compass or title figures. Such an algorithm might then direct maps that includes compass or title circles to an altered version of the Detect_Circles script.

See below for two types of titles erroneously identified as possible FMGP candidates. The first image includes a problematic compass rose, though in this case the compass was not picked up by the Hough.Circles package as a possible circle.

<a href="/sanborn/title1.jpg"><img src="/sanborn/title1.jpg" style="float: left; width: 40%; margin-right: 3%; margin-bottom: 0.5em;">
<a href="/sanborn/title2.jpg"><img src="/sanborn/title2.jpg" style="float: left; width: 40%; margin-right: 3%; margin-bottom: 0.5em;">

<p style="clear: both;">
</a>


### Sanborn maps: limitations
The Detect_Circles method is also beholden to the scope and accuracy of Sanborn documents, which introduces several limitations to the approach described thus far. First, the Sanborn company was focused on assessing urban fire risk, so their mapping operation at times failed to capture outlying regions (Hatheway, 2012). More significantly, Sanborn maps were published with lesser frequency than industry directories; given the sometimes-frequent turnover in the MFG industry, sites that opened and closed between publication years might not be captured using an approach that depends on Sanborn documents. Additionally, for cities that were settled and industrialized relatively early, the MFG industry in many cases predated the first Sanborn map publications. The Providence Gas Company, for instance, was incorporated in June of 1847, twenty years before the first Sanborn maps were published in New England. The Sanborn approach might therefore miss the earliest MFG sites in cities with an especially long industrial history. Approaches that rely on Brown's Directory listings, which were first published in 1886, are also limited in this fashion.

These limitations are partially mitigated by several factors. First, the MFG industry, decidedly and definitionally an urban phenomenon, was unlikely to stretch beyond the built-up areas where the Sanborn company operated. Second, Sanborn maps capture building footprints whether or not those buildings were in use at the time of publication. This means that MFG sites might be identified long after closure so long as the gasometer or gas holder structure was still standing. Indeed, the Aleppo Street site in Providence was included in both the 1889 and 1920 map sets despite the fact it was no longer in use; the circular gas holder still stands, today, one of the last remaining gas storage structures in Providence.

### References

Brown, E. C. (1886). *Brown's directory of American gas companies*.

Ecology & Environment Inc. (1986). *Coal/oil gasification site study,
Region X* (TDD R10-8405-03). US Environmental Protection Agency.

Frickel, S., & Elliott, J. R. (2018). *Sites unseen: Uncovering hidden
hazards in American cities*. Russel Sage Foundation.

Hatheway, A. W. (2012). *Remediation of former manufactured gas plants
and other coal-tar sites*. CRC Press.

Kim, K. H., Jahan, S. A., Kabir, E., & Brown, R. J. (2013). A review of
airborne polycyclic aromatic hydrocarbons (PAHs) and their human health
effects. *Environment International*, *60*, 71--80.
<https://doi.org/10.1016/j.envint.2013.07.019>

Phillips, W. H. (1991). Cleanup of manufactured gas plants: Utilities
may be liable. *Environmental Claims Journal*, *4*(2), 231--245.
<https://doi.org/10.1080/10406029109379158>

Radian Corporation. (1985). *Survey of town gas and by-product
production and locations in the US (1880-1950)* (EPA-600/7-85-004). US
Environmental Protection Agency.

White, A. H., & Barker, P. (1911). *Coals available for the manufacture
of illuminating gas* (Bulletin Nos. 6). Bureau of Mines, US Department
of Interior.
