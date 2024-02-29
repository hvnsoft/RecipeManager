import { PrismaClient } from '@prisma/client';
import { RecipeService } from '../../../services/recipe.service/recipe.service';

// Mock PrismaClient instance
jest.mock('@prisma/client', () => {
    const mockPrismaClient = {
        ingredient: {
            findFirst: jest.fn(),
            create: jest.fn(),
            findMany: jest.fn(),
            count: jest.fn(),
        },
        recipe: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        recipeIngredient: {
            create: jest.fn(),
            count: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

describe('RecipeService', () => {
    let prismaClient: PrismaClient;
    let recipeService: RecipeService;

    beforeEach(() => {
        prismaClient = new PrismaClient();
        recipeService = new RecipeService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findRecipeById', () => {
        
        it('should return null if recipe is not found', async () => {
            (prismaClient.recipe.findUnique as jest.Mock).mockResolvedValueOnce(null);

            const result = await recipeService.findRecipeById(1);

            expect(result).toBeNull();
            expect(prismaClient.recipe.findUnique).toHaveBeenCalledWith(expect.objectContaining({
                where: { id: 1 },
            }));
        });
    });
});
