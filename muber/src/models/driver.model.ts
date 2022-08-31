import mongoose, { Model, Types } from 'mongoose';
const Schema = mongoose.Schema;

// Subdocument definition
interface IPoint {
  coordinates: number[];
  type: string;
}

const PointSchema = new Schema<IPoint>({
  coordinates: { type: [Number], index: '2dsphere' },
  type: { type: String, default: 'Point' },
});

// Document definition
interface IDriver {
  email: string;
  driving: boolean;
  geometry: IPoint;
}

type IDriverDocumentOverrides = {
  geometry: Types.Subdocument<Types.ObjectId> & IPoint;
};

type IDriverModelType = Model<IDriver, {}, IDriverDocumentOverrides>;

const DriverSchema = new Schema<IDriver, IDriverModelType>({
  email: {
    type: String,
    required: true,
  },
  driving: {
    type: Boolean,
    default: false,
  },
  geometry: PointSchema,
});

const Driver = mongoose.model<IDriver, IDriverModelType>(
  'driver',
  DriverSchema
);

export default Driver;
