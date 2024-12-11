const headers = {
    headers: {
        "content-type": "application/json"
    }
}

const resolvers = {
  Query: {
    launches: async () => {
      // Fetch data from SpaceX API
      const response = await fetch('https://api.spacexdata.com/v3/launches', headers);
      const launches = await response.json();
      return launches;
    },
    launch: async (parent, args) => {
      // Fetch specific launch by ID
      const response = await fetch(`https://api.spacexdata.com/v3/launches/${args.id}`);
      const launch = await response.json();
      return launch;
    },
    rockets: async () => {
      const response = await fetch('https://api.spacexdata.com/v3/rockets', headers);
      const rockets = await response.json();
      return rockets;
    },

    getRocket: async () => {
      const response = await fetch('https://api.spacexdata.com/v3/rockets', headers);
      const rockets = await response.json();
      return rockets;
    },

    launchesPast: async (_, {limit}, {}) => {
      const response = await fetch('https://api.spacexdata.com/v3/launches', headers);
      const rockets = await response.json();
      return rockets;
    },

    getShips: async () => {
      const response = await fetch('https://api.spacexdata.com/v3/ships', headers);
      const ships = await response.json();
      return ships;
    },

    getMissions: async (_, { find, limit, sort }, {}) => {
      const params = new URLSearchParams();
      if (find && find.manufacturers) {
        params.append('manufacturers', find.manufacturers);
      }
      if (limit) {
        params.append('limit', limit);
      }
      if (sort) {
        params.append('sort', sort);
      }

      const response = await fetch(`https://api.spacexdata.com/v3/missions?${params.toString()}`, headers);
      const missions = await response.json();


      return missions;
    },

    getMissionsWithRegex: async (_, { matchesRegex }, {}) => {
      const response = await fetch(`https://api.spacexdata.com/v3/missions`, headers);
      let missions = await response.json();

      if (matchesRegex) {
        const regex = new RegExp(matchesRegex);
        return missions.filter((mission) => regex.test(mission.mission_name));
      }
      
      return missions;
    },

    getLaunchesBySort: async (_, { sortBy = "launch_year", sortDirection = "ASC" }) => {
      // Fetch launches data (mocked here for simplicity)
      const response = await fetch('https://api.spacexdata.com/v3/launches');
      const launches = await response.json();

      // Apply sorting
      return launches.sort((a, b) => {
        if (sortDirection === "ASC") {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
    },

    // Pagination - Offset and cursor

    getLaunchesOnOffset: async (_, {offset = 0, limit = 7}) => {
      const response = await fetch('https://api.spacexdata.com/v3/launches');
      let launches = await response.json();
      if (offset > 0 || limit > 0) {
        launches = launches.slice(offset, offset + limit);
      } 
      return launches;
    },

    getLaunchesOnCursor: async (_, {first = 10, after}) => {
      const response = await fetch('https://api.spacexdata.com/v3/launches');
      let launches = await response.json();
      const startIndex = after ? launches.findIndex(launch => launch.flight_number === parseInt(after)) + 1 : 0;

      // Slice the launches array to simulate pagination
      const paginatedLaunches = launches.slice(startIndex, startIndex + first);
    
      // Generate cursors for each launch
      const edges = paginatedLaunches.map(launch => ({
        node: launch,
        cursor: launch.flight_number.toString(), // Use flight_number as a cursor
      }));
    
      // Determine if there is a next page
      const hasNextPage = startIndex + first < launches.length;
      const endCursor = hasNextPage ? edges[edges.length - 1].cursor : null;
    
        return {
          edges,
          pageInfo: {
            hasNextPage,
            endCursor,
          },
        };
    }
  }
};


export default resolvers;
   