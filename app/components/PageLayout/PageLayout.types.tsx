export type PageLayoutProps = {
  children: React.ReactNode;
  title?: Title;
  className?: string;
  previousBtn?: PreviousButton;
  fullWidth?: boolean;
};

export type PreviousButton = {
  hidden?: boolean;
  disabled?: boolean;
};

export type Title = {
  text?: string;
  className?: string;
  disabled?: boolean;
};
