export enum Screens {
  Home = "Home",
  Settings = "Settings",
  TodoDetails = "TodoDetails",
  Analytics = "Analytics",
  Profile = "Profile",
}

export enum Tabs {
  Add = "AddTab",
}

export enum Stacks {
  AppStack = "AppStack",
}

export type AppScreen = Screens | Screens.TodoDetails;
