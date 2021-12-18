import { ClientModel } from "./ClientModel";

export interface CurrentUserContextModel {
  currentUser?: ClientModel;
  fetchUser: () => Promise<void>;
  isPending: boolean;
  handleLogout: () => Promise<void>;
}
