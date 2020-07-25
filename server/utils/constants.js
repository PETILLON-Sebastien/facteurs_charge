var zones = [
    {
        country: 'FR',
        code_insee_region: null,
        name: 'france',
        display_name: 'France',
    },
    {
        country: 'FR',
        code_insee_region: 11,
        name: 'ile_de_france',
        display_name: 'Ile-de-France',
    },
    {
        country: 'FR',
        code_insee_region: 24,
        name: 'centre_val_de_loire',
        display_name: 'Centre-Val de Loire',
    },
    {
        country: 'FR',
        code_insee_region: 27,
        name: 'bourgogne_franche_comte',
        display_name: 'Bourgogne-Franche-Comté',
    },
    {
        country: 'FR',
        code_insee_region: 28,
        name: 'normandie',
        display_name: 'Normandie',
    },
    {
        country: 'FR',
        code_insee_region: 32,
        name: 'hauts_de_france',
        display_name: 'Hauts-de-France',
    },
    {
        country: 'FR',
        code_insee_region: 44,
        name: 'grand_est',
        display_name: 'Grand-Est',
    },
    {
        country: 'FR',
        code_insee_region: 52,
        name: 'pays_de_la_loire',
        display_name: 'Pays de la Loire',
    },
    {
        country: 'FR',
        code_insee_region: 53,
        name: 'bretagne',
        display_name: 'Bretagne',
    },
    {
        country: 'FR',
        code_insee_region: 75,
        name: 'nouvelle_aquitaine',
        display_name: 'Nouvelle-Aquitaine',
    },
    {
        country: 'FR',
        code_insee_region: 76,
        name: 'occitanie',
        display_name: 'Occitanie',
    },
    {
        country: 'FR',
        code_insee_region: 84,
        name: 'auvergne_rhone_alpes',
        display_name: 'Auvergne-Rhône-Alpes',
    },
    {
        country: 'FR',
        code_insee_region: 93,
        name: 'paca',
        display_name: 'Provence-Alpes-Côte d\'Azur',
    },
    {
        country: 'DE',
        code_insee_region: null,
        name: 'allemagne',
        display_name: 'Allemagne',
    },
    {
        country: 'BE',
        code_insee_region: null,
        name: 'belgique',
        display_name: 'Belgique',
    },
    {
        country: 'IT',
        code_insee_region: null,
        name: 'italie',
        display_name: 'Italie',
    },
    {
        country: 'LU',
        code_insee_region: null,
        name: 'luxembourg',
        display_name: 'Luxembourg',
    },
    {
        country: 'GB',
        code_insee_region: null,
        name: 'royaume_uni',
        display_name: 'Royaume-Uni',
    },
    {
        country: 'ES',
        code_insee_region: null,
        name: 'espagne',
        display_name: 'Espagne',
    },
    {
        country: 'CH',
        code_insee_region: null,
        name: 'suisse',
        display_name: 'Suisse',
    }
];

var power_sources = [
    {
        name: 'solaire',
        api_name: 'solar',
        display_name: 'Solaire',
    },
    {
        name: 'eolien',
        api_name: 'wind',
        display_name: 'Eolien',
    },
    {
        name: 'hydraulique',
        api_name: 'hydraulic',
        display_name: 'Hydraulique',
        details: [
            {
                name: 'hydraulique_step_turbinage',
                api_name: 'hydraulic_pumping_turbine',
                display_name: 'Turbinage de step'
            },
            {
                name: 'hydraulique_lacs',
                api_name: 'hydraulic_lakes',
                display_name: 'Lacs'
            },
            {
                name: 'hydraulique_fil_eau_eclusee',
                api_name: 'hydraulic_along_waterside_lock',
                display_name: 'Fil de l\'eau et éclusée'
            }
        ]
    },
    {
        name: 'nucleaire',
        api_name: 'nuclear',
        display_name: 'Nucléaire',
    },
    {
        name: 'bioenergies',
        api_name: 'bioenergy',
        display_name: 'Bioénergies',
        details: [
            {
                name: 'bioenergies_biomasse',
                api_name: 'bioenergy_biomass',
                display_name: 'Biomasse'
            },
            {
                name: 'bioenergies_dechets',
                api_name: 'bioenergy_waste',
                display_name: 'Déchets'
            },
            {
                name: 'bioenergies_biogaz',
                api_name: 'bioenergy_biogas',
                display_name: 'Biogaz'
            }
        ]
    },
    {
        name: 'thermique',
        api_name: 'fossil',
        display_name: 'Fossile',
        details: [
            {
                name: 'charbon',
                api_name: 'coal',
                display_name: 'Charbon'
            },
            {
                name: 'fioul',
                display_name: 'Fioul',
                api_name: 'oil',
                details: [
                    {
                        name: 'fioul_tac',
                        api_name: 'oil_turbines',
                        display_name: 'Turbines à combustion'
                    },
                    {
                        name: 'fioul_cogen',
                        api_name: 'oil_cogen',
                        display_name: 'Cogénération'
                    },
                    {
                        name: 'fioul_autres',
                        api_name: 'oil_others',
                        display_name: 'Autres'
                    }
                ]
            },
            {
                name: 'gaz',
                api_name: 'gas',
                display_name: 'Gaz',
                details: [
                    {
                        name: 'gaz_tac',
                        api_name: 'gas_turbines',
                        display_name: 'Turbines à combustion'
                    },
                    {
                        name: 'gaz_cogen',
                        api_name: 'gas_cogen',
                        display_name: 'Cogénération'
                    },
                    {
                        name: 'gaz_ccg',
                        api_name: 'gas_mixed_steam_cycle',
                        display_name: 'Cycle Combiné Gaz'
                    },
                    {
                        name: 'gaz_autres',
                        api_name: 'gas_others',
                        display_name: 'Autres'
                    }
                ]
            }
        ]
    }
];

var consumption_targets = [
    {
        name: 'consommation',
        display_name: 'Consommation'
    },
    {
        name: 'pompage',
        display_name: 'Pompage step'
    }
];

var opendatareseaux_wording = {
    flow: 'flux_physiques_de_',
    to: '_vers_',
    exchanges_with_region : 'ech_comm',
    exchanges_total: 'ech_physiques',
    date: 'date',
    hour: 'heure',
    date_hour: 'date_heure',
    consumption: 'consommation',
    step_storage: 'pompage',
    code_insee_region: 'code_insee_region',
    fields: 'fields',
    load_prefix: 'tch_'
};

var api_wording = {
    zone_id: 'zoneId',
    snapshots: 'snapshots',
    source_zone: 'sourceZone',
    target_zone: 'targetZone',
    description: 'description',
    value: 'value',
    unit: 'unit',
    used: 'used',
    step_storage: 'stepStorage',
    datetime: 'datetime',
    capacity: 'capacity',
    production: 'production',
    load: 'load',
    details: 'details',
    breakdown: 'breakdown'
};

var units = {
    kilo_watt: 'KW',
    mega_watt: 'MW',
    giga_watt: 'GW'
};

var data_per_hour = 4;
var french_regions_count = 12;

exports.zones = zones;
exports.power_sources = power_sources;
exports.consumption_targets = consumption_targets;
exports.api_wording = api_wording;
exports.opendatareseaux_wording = opendatareseaux_wording;
exports.units = units;
exports.data_per_hour = data_per_hour;
exports.french_regions_count = french_regions_count;
exports.consumption = 'consumption';
exports.capacity = 'capacity';
exports.exchanges = 'exchanges';
exports.production = 'production';
