import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Capsule {
    id: ID
    capsule_serial: String
    capsule_id: String
    status: String
    original_launch: String
    original_launch_unix: Int
    missions: [Mission]
    landings: Int
    type: String
    reuse_count: Int
  }

  type Core {
    id: ID
    core_serial: String
    status: String
    original_launch: String
    original_launch_unix: Int
    missions: [Mission]
    reuse_count: Int
    rtls_attempts: Int
    rtls_landings: Int
    asds_attempts: Int
    asds_landings: Int
    last_update: String
    launches: [Launch]
  }

  type Dragon {
    id: ID
    name: String
    type: String
    active: Boolean
    crew_capacity: Int
    sidewall_angle_deg: Float
    orbit_duration_yr: Int
    dry_mass_kg: Int
    dry_mass_lb: Int
    first_flight: String
    heat_shield: HeatShield
    thrusters: [Thruster]
    launch_payload_mass: Mass
    launch_payload_vol: Volume
    return_payload_mass: Mass
    return_payload_vol: Volume
    pressurized_capsule: PressurizedCapsule
    trunk: Trunk
    height_w_trunk: Dimensions
    diameter: Dimensions
    wikipedia: String
    description: String
  }

  type HeatShield {
    material: String
    size_meters: Float
    temp_degrees: Int
    dev_partner: String
  }

  type Thruster {
    type: String
    amount: Int
    pods: Int
    fuel_1: String
    fuel_2: String
    isp: Int
    thrust: Force
  }

  type Force {
    kN: Float
    lbf: Float
  }

  type Mass {
    kg: Int
    lb: Int
  }

  type Volume {
    cubic_meters: Int
    cubic_feet: Int
  }

  type PressurizedCapsule {
    payload_volume: Volume
  }

  type Trunk {
    trunk_volume: Volume
    cargo: Cargo
  }

  type Cargo {
    solar_array: Int
    unpressurized_cargo: Boolean
  }

  type Dimensions {
    meters: Float
    feet: Float
  }

  type Landpad {
    id: ID
    full_name: String
    status: String
    location: Location
    landing_type: String
    attempted_landings: Int
    successful_landings: Int
    wikipedia: String
    details: String
  }

  type LaunchLinks {
    mission_patch: String
    mission_patch_small: String
    article_link: String
    wikipedia: String
    video_link: String
    flickr_images: [String]
  }

  type Launchpad {
    id: ID
    full_name: String
    status: String
    location: Location
    vehicles_launched: [String]
    wikipedia: String
    details: String
  }

  type Location {
    name: String
    region: String
    latitude: Float
    longitude: Float
  }

  type Mission {
    mission_name: String!
    mission_id: String!
    manufacturers: [String!]!
    payload_ids: [String!]!
    wikipedia: String!
    website: String!
    twitter: String
    description: String!
  }

  type Rocket {
    id: Int!
    active: Boolean!
    stages: Int!
    boosters: Int
    cost_per_launch: Int!
    success_rate_pct: Float!
    first_flight: String!
    country: String!
    company: String!
    height: Dimensions!
    diameter: Dimensions!
    mass: Mass!
    payload_weights: [PayloadWeight!]!
    first_stage: RocketFirstStage!
    second_stage: RocketSecondStage!
    engines: Engines!
    landing_legs: LandingLegs!
    flickr_images: [String!]!
    wikipedia: String!
    description: String!
    rocket_id: String!
    rocket_name: String!
    rocket_type: String!
  }

  type Dimensions {
    meters: Float
    feet: Float
  }

  type Mass {
    kg: Int!
    lb: Int!
  }

  type PayloadWeight {
    id: String!
    name: String!
    kg: Int!
    lb: Int!
  }

  type RocketFirstStage {
    reusable: Boolean!
    engines: Int!
    fuel_amount_tons: Float!
    burn_time_sec: Int
    thrust_sea_level: Thrust!
    thrust_vacuum: Thrust!
  }

  type RocketSecondStage {
    reusable: Boolean!
    engines: Int!
    fuel_amount_tons: Float!
    burn_time_sec: Int
    thrust: Thrust!
    payloads: Payloads!
  }

  type Payloads {
    option_1: String!
    option_2: String
    composite_fairing: CompositeFairing!
  }

  type CompositeFairing {
    height: Dimensions!
    diameter: Dimensions!
  }

  type Thrust {
    kN: Float!
    lbf: Float!
  }

  type Engines {
    number: Int!
    type: String!
    version: String
    layout: String
    isp: ISP!
    engine_loss_max: Int
    propellant_1: String!
    propellant_2: String!
  }

  type Roadster {
    name: String
    launch_date_utc: String
    launch_mass_kg: Int
    orbit_type: String
    details: String
    wikipedia: String
    video: String
    distance_from_earth_km: Float
  }

  type Ship {
    id: ID
    name: String
    type: String
    roles: [String]
    active: Boolean
    imo: Int
    mmsi: Int
    abs: Int
    class: Int
    weight_lbs: Int
    weight_kg: Int
    year_built: Int
    home_port: String
    status: String
    speed_kn: Float
    course_deg: Float
    position: Position
    successful_landings: Int
    attempted_landings: Int
    missions: [Mission]
    url: String
    image: String
  }

  type Position {
    latitude: Float
    longitude: Float
  }

  type ISP {
    sea_level: Int!
    vacuum: Int!
  }

  type LandingLegs {
    number: Int!
    material: String
  }

  # Newly added

  type Query {
    launches: [Launch!]!
  }

  type Launch {
    id: ID
    flight_number: Int!
    mission_name: String!
    mission_id: [String!]!
    upcoming: Boolean!
    launch_year: String!
    launch_date_unix: Int!
    launch_date_utc: String!
    launch_date_local: String!
    is_tentative: Boolean!
    tentative_max_precision: String!
    tbd: Boolean!
    launch_window: Int!
    rocket: Rocket!
    ships: [String!]!
    telemetry: Telemetry
    launch_site: LaunchSite!
    launch_success: Boolean
    launch_failure_details: LaunchFailureDetails
    links: Links!
    details: String
    static_fire_date_utc: String
    static_fire_date_unix: Int
    timeline: Timeline
    crew: String
  }

  type Rocket {
    rocket_id: String!
    rocket_name: String!
    rocket_type: String!
    first_stage: RocketFirstStage!
    second_stage: RocketSecondStage!
    fairings: Fairings
  }

  type Core {
    core_serial: String!
    flight: Int!
    block: Int
    gridfins: Boolean!
    legs: Boolean!
    reused: Boolean!
    land_success: Boolean
    landing_intent: Boolean!
    landing_type: String
    landing_vehicle: String
  }

  type Payload {
    payload_id: String!
    norad_id: [Int!]!
    reused: Boolean!
    customers: [String!]!
    nationality: String!
    manufacturer: String
    payload_type: String!
    payload_mass_kg: Float
    payload_mass_lbs: Float
    orbit: String!
    orbit_params: OrbitParams!
  }

  type OrbitParams {
    reference_system: String
    regime: String
    longitude: Float
    semi_major_axis_km: Float
    eccentricity: Float
    periapsis_km: Float
    apoapsis_km: Float
    inclination_deg: Float
    period_min: Float
    lifespan_years: Int
    epoch: String
    mean_motion: Float
    raan: Float
    arg_of_pericenter: Float
    mean_anomaly: Float
  }

  type Fairings {
    reused: Boolean!
    recovery_attempt: Boolean!
    recovered: Boolean!
    ship: String
  }

  type Telemetry {
    flight_club: String
  }

  type LaunchSite {
    site_id: String!
    site_name: String!
    site_name_long: String!
  }

  type LaunchFailureDetails {
    time: Int!
    altitude: Float
    reason: String!
  }

  type Links {
    mission_patch: String
    mission_patch_small: String
    reddit_campaign: String
    reddit_launch: String
    reddit_recovery: String
    reddit_media: String
    presskit: String
    article_link: String
    wikipedia: String
    video_link: String
    youtube_id: String
    flickr_images: [String!]!
  }

  type Timeline {
    webcast_liftoff: Int
  }

  type launchesPast {
    mission_name: String!
    launch_date_local: String!
    launch_site: LaunchSite
    links: LaunchLinks
    rocket: Rocket
  }

  # Define Queries
  type Query {
    launches: [Launch!]!
    launch(id: ID!): Launch
    rockets: [Rocket]
    launchesPast(limit: Int): [launchesPast!]!
    missions: [Mission]
    getRocket: [Rocket]
    getShips: [Ship]

    # filter sort
    getMissions(find: MissionFilterInput, limit: Int, sort: String): [Mission]
    getMissionsWithRegex(matchesRegex: String): [Mission]
    getLaunchesBySort(
      sortBy: LaunchSortBy
      sortDirection: SortDirection
    ): [Launch]

    # paginatiopn
    getLaunchesOnOffset(offset: Int, limit: Int): [Launch]

    #pagination with curosr
    getLaunchesOnCursor(first: Int, after: Int): LaunchConnection
  }

  type LaunchEdge {
    node: Launch
    cursor: String
  }

  type PageInfo {
    hasNextPage: Boolean
    endCursor: String
  }

  type LaunchConnection {
    edges: [LaunchEdge]
    pageInfo: PageInfo
  }

  enum LaunchSortBy {
    launch_year
    mission_name
  }

  enum SortDirection {
    ASC
    DESC
  }

  input MissionFilterInput {
    payload_ids: String
    mission_name: String
    manufacturers: String
  }
`;

export default typeDefs;
