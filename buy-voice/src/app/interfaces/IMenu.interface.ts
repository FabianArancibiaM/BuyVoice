export interface IInfoCardMenu {
    title: string;
    children: IInfoCardSubMenu[];
    icon: string;
}

export interface IInfoCardSubMenu {
    title: string;
    url: string;
    icon: string;
}
