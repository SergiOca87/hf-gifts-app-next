import { clsx } from "clsx"
import { twMerge } from "tailwind-merge";
import qs from "qs";

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function getStrapiURL() {
    return process.env.NEXT_PUBLIC_STRAPI_URL;
}


export function getStrapiMedia(url) {
    if (url == null) return null;
    if (url.startsWith("data:")) return url;
    if (url.startsWith("http") || url.startsWith("//")) return url;
    return `${getStrapiURL()}${url}`;
}


export async function getData(path, query = '') {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

    const url = new URL(path, baseUrl);
    url.search = query;

    try {
        const res = await fetch(url.href);

        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export const giftsQuery = qs.stringify({
    populate: {
        featured_image: {
            fields: ['url']
        },
        image_gallery: {
            fields: ['url']
        },
        gift_categories: {
            fields: ['name']
        }
    }
});

export const clientQuery = qs.stringify({
    populate: {
        gifts: {
            populate: {
                featured_image: {
                    fields: ['url']
                },
            }
        },

        theme: {
            populate: {
                title: {
                    fields: ['text']
                },
                main_color_hex: {
                    fields: ['text']
                },
                secondary_color_hex: {
                    fields: ['text']
                },
                logo: {
                    fields: ['url']
                },
                decorator: {
                    fields: ['url']
                }
            }
        }
    }
});

export const eventQuery = qs.stringify({
    populate: {
        gifts: {
            populate: {
                featured_image: {
                    fields: ['url']
                },
            }
        },

        full_logo: {
            fields: ['url']
        },
        qr_logo: {
            fields: ['url']
        },

        theme: {
            populate: {
                title: {
                    fields: ['text']
                },
                main_color_hex: {
                    fields: ['text']
                },
                secondary_color_hex: {
                    fields: ['text']
                },
                logo: {
                    fields: ['url']
                },
                decorator: {
                    fields: ['url']
                }
            }
        }
    }
});