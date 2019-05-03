import { VichleStatus } from '../models/vichle_status.model';

export class VichelsStatusesData {
  static Get_VichelsStatuses : VichleStatus[] = [
      {vin : '123', status: true, customerId: 1  },
      {vin : '456', status: true, customerId: 1  },
      {vin : '789', status: true, customerId: 1  }
  ];
}
