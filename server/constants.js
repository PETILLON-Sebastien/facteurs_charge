var zones = [
    {
        country: "FR",
        code_insee_region: 11,
        name: "ile_de_france",
        display_name: "Ile-de-France",
    },
    {
        country: "FR",
        code_insee_region: 24,
        name: "centre_val_de_loire",
        display_name: "Centre-Val de Loire",
    },
    {
        country: "FR",
        code_insee_region: 27,
        name: "bourgogne_franche_comte",
        display_name: "Bourgogne-Franche-Comté",
    },
    {
        country: "FR",
        code_insee_region: 28,
        name: "normandie",
        display_name: "Normandie",
    },
    {
        country: "FR",
        code_insee_region: 32,
        name: "hauts_de_france",
        display_name: "Hauts-de-France",
    },
    {
        country: "FR",
        code_insee_region: 44,
        name: "grand_est",
        display_name: "Grand-Est",
    },
    {
        country: "FR",
        code_insee_region: 53,
        name: "bretagne",
        display_name: "Bretagne",
    },
    {
        country: "FR",
        code_insee_region: 75,
        name: "nouvelle_aquitaine",
        display_name: "Nouvelle-Aquitaine",
    },
    {
        country: "FR",
        code_insee_region: 76,
        name: "occitanie",
        display_name: "Occitanie",
    },
    {
        country: "FR",
        code_insee_region: 84,
        name: "auvergne_rhone_alpes",
        display_name: "Auvergne-Rhône-Alpes",
    },
    {
        country: "FR",
        code_insee_region: 93,
        name: "paca",
        display_name: "Provence-Alpes-Côte d'Azur",
    },
    {
        country: "FR",
        code_insee_region: null,
        name: "france",
        display_name: "France",
    },
    {
        country: "DE",
        code_insee_region: null,
        name: "allemagne",
        display_name: "Allemagne",
    },
    {
        country: "BE",
        code_insee_region: null,
        name: "belgique",
        display_name: "Belgique",
    },
    {
        country: "IT",
        code_insee_region: null,
        name: "italie",
        display_name: "Italie",
    },
    {
        country: "LU",
        code_insee_region: null,
        name: "luxembourg",
        display_name: "Luxembourg",
    },
    {
        country: "GB",
        code_insee_region: null,
        name: "royaume_uni",
        display_name: "Royaume-Uni",
    },
    {
        country: "ES",
        code_insee_region: null,
        name: "espagne",
        display_name: "Espagne",
    },
    {
        country: "CH",
        code_insee_region: null,
        name: "suisse",
        display_name: "Suisse",
    }
];

var power_sources = [
    {
        name: "solaire",
        display_name: "Solaire",
    },
    {
        name: "eolien",
        display_name: "Eolien",
    },
    {
        name: "hydraulique",
        display_name: "Hydraulique",
        details: [
            {
                name: "hydraulique_step_turbinage",
                display_name: "Turbinage de step"
            },
            {
                name: "hydraulique_lacs",
                display_name: "Lacs"
            },
            {
                name: "hydraulique_fil_eau_eclusee",
                display_name: "Fil de l'eau et éclusée"
            }
        ]
    },
    {
        name: "nucleaire",
        display_name: "Nucléaire",
    },
    {
        name: "bioenergies",
        display_name: "Bioénergies",
        details: [
            {
                name: "bioenergies_biomasse",
                display_name: "Biomasse"
            },
            {
                name: "bioenergies_dechets",
                display_name: "Déchets"
            },
            {
                name: "bioenergies_biogaz",
                display_name: "Biogaz"
            }
        ]
    },
    {
        name: "thermique",
        display_name: "Fossile",
        details: [
            {
                name: "charbon",
                display_name: "Charbon"
            },
            {
                name: "fioul",
                display_name: "Fioul",
                details: [
                    {
                        name: "fioul_tac",
                        display_name: "Turbines à combustion"
                    },
                    {
                        name: "fioul_cogen",
                        display_name: "Cogénération"
                    },
                    {
                        name: "fioul_autres",
                        display_name: "Autres"
                    }
                ]
            },
            {
                name: "gaz",
                display_name: "Gaz",
                details: [
                    {
                        name: "gaz_tac",
                        display_name: "Turbines à combustion"
                    },
                    {
                        name: "gaz_cogen",
                        display_name: "Cogénération"
                    },
                    {
                        name: "gaz_ccg",
                        display_name: "Cycle Combiné Gaz"
                    },
                    {
                        name: "gaz_autres",
                        display_name: "Autres"
                    }
                ]
            }
        ]
    }
];

var consumption_targets = [
    {
        name: "consommation",
        display_name: "Consommation"
    },
    {
        name: "pompage",
        display_name: "Pompage step"
    }
];

var api_wording = {
    export: "export",
    import: "import",
    exchanges_with_region : "ech_comm",
    exchanges_total: "ech_physiques",
    date: "date",
    hour: "heure"
}

exports.zones = zones;
exports.power_sources = power_sources;
exports.consumption_targets = consumption_targets;
exports.api_wording = api_wording;