from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    register_user, CustomTokenObtainPairView,  # CBV for login
    product_list, product_detail, create_order, order_detail,
    add_order_item, process_payment
)

urlpatterns = [
    # Authentication (CBV for login)
    path('register/', register_user, name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Products (FBV)
    path('products/', product_list, name='product-list'),
    path('products/<int:pk>/', product_detail, name='product-detail'),

    # Orders (FBV)
    path('orders/', create_order, name='create-order'),
    path('orders/<int:pk>/', order_detail, name='order-detail'),
    path('orders/<int:order_id>/items/', add_order_item, name='add-order-item'),
    path('orders/<int:order_id>/pay/', process_payment, name='process-payment'),
]
