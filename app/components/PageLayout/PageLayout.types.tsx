export type SkeletonProps = {
    children: React.ReactNode;
    title?: string;
    className?: string;
    previousBtn: PreviousButton;
}

export type PreviousButton = {
    hidden?: boolean;
    disabled?: boolean;
}