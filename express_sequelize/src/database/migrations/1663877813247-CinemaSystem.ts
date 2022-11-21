import { literal, QueryInterface } from 'sequelize';
import {
  addYears,
  format,
  subYears,
  setMonth,
  setDate,
  setHours,
} from 'date-fns';
import { ModelAttributes } from 'sequelize/types/model';

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface) => {
    // Users 
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: 'varchar',
        required: true
      },
      email: {
        type: 'varchar',
        len: [4, 100],
        isEmail: true
      },
      password: {
        type: 'varchar',
        required: true
      },
      fullName: {
        type: 'varchar',
        required: true
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    // Movies 
    await queryInterface.createTable('movie', {
      id: {
        allowNull: false,
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      movieTitle: {
        type: 'varchar',
        required: true
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    // Movie Prices
    await queryInterface.createTable('pricing', {
      id: {
        allowNull: false,
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      show: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'movie',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      price: {
        type: 'integer',
        required: true
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    // Cinema 
    await queryInterface.createTable('cinema', {
      id: {
        allowNull: false,
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      showroom: {
        type: 'varchar',
        required: true
      },
      capacity: {
        type: 'integer',
        required: true
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    // Showroom Seat
    await queryInterface.createTable('seat', {
      id: {
        allowNull: false,
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      cinema: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'cinema',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      seat: {
        type: 'varchar',
        required: true
      },
      price: {
        type: 'integer',
        required: true
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    // Movies ShowTimes By Cinema
    await queryInterface.createTable('showtime', {
      id: {
        allowNull: false,
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      show: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'movie',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      cinema: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'cinema',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      start: {
        type: 'timestamp',
      },
      end: {
        type: 'timestamp',
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    // Movie Booking
    await queryInterface.createTable('movie_booking', {
      id: {
        allowNull: false,
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      showtime: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'showtime',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      seat: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'seat',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      user: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'user',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
