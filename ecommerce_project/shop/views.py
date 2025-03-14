from django.shortcuts import render

# Create your views here.
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Product, Order, OrderItem, Payment
from .serializers import ProductSerializer, OrderSerializer, OrderItemSerializer, PaymentSerializer

# ===========================
# 📌 PRODUCTS (CRUD)
# ===========================
@api_view(['GET', 'POST'])
def product_list(request):
    """List all products or create a new one"""
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, pk):
    """Retrieve, update, or delete a product"""
    product = get_object_or_404(Product, pk=pk)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ===========================
# 📌 ORDERS (Create & Retrieve)
# ===========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    """Create a new order"""
    serializer = OrderSerializer(data=request.data)
    
    if serializer.is_valid():
        order = serializer.save(user=request.user)  # Link order to logged-in user
        return Response({"message": "Order created!", "order_id": order.id}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_detail(request, pk):
    """Retrieve a specific order (Only owner can view)"""
    order = get_object_or_404(Order, pk=pk, user=request.user)  
    serializer = OrderSerializer(order)
    return Response(serializer.data)

# ===========================
# 📌 ORDER ITEMS (Add Item to Order)
# ===========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_order_item(request, order_id):
    """Add an item to an existing order"""
    order = get_object_or_404(Order, pk=order_id, user=request.user)  
    serializer = OrderItemSerializer(data=request.data)

    if serializer.is_valid():
        item = serializer.save(order=order)  # Attach the item to the order
        return Response({"message": "Item added!", "item_id": item.id}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ===========================
# 📌 PAYMENTS (Process Payment)
# ===========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def process_payment(request, order_id):
    """Process a payment for an order"""
    order = get_object_or_404(Order, pk=order_id, user=request.user)
    
    # Prevent duplicate payments
    if hasattr(order, 'payment'):
        return Response({"error": "Payment already processed for this order."}, status=status.HTTP_400_BAD_REQUEST)

    serializer = PaymentSerializer(data=request.data)
    
    if serializer.is_valid():
        payment = serializer.save(order=order, user=request.user)  # Attach payment to order

        # Send confirmation email
        send_mail(
            'Order Payment Confirmation',
            f'Thank you for your payment! Your order is confirmed.',
            'noreply@myshop.com',
            [request.user.email],
        )

        return Response({"message": "Payment successful!", "payment_id": payment.id}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
