export interface MenuItem {
    id: string;
    nameEs: string;
    nameEn: string;
    price: string;
    descEs: string;
    descEn: string;
    image?: string;
}

export interface MenuCategory {
    id: string;
    nameEs: string;
    nameEn: string;
    items: MenuItem[];
}

export interface SiteData {
    heroBadgeEs: string;
    heroBadgeEn: string;
    heroTitle: string;
    heroDescEs: string;
    heroDescEn: string;
    avgPrice: string;
    phone: string;
    address: string;
    directionsBtnEs: string;
    directionsBtnEn: string;
    aboutDescEs: string;
    aboutDescEn: string;
    showSpecialEvents: boolean;
    specialEventsTitleEs: string;
    specialEventsTitleEn: string;
    specialEventsDescEs: string;
    specialEventsDescEn: string;
    specialEventsImage: string;
    logoUrl: string;
    promoActive: boolean;
    promoMessage: string;
    promoDiscount: string;
    categories: MenuCategory[];
}
